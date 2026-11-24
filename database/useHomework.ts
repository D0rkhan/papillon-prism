import { Model, Q } from "@nozbe/watermelondb";
import { useEffect, useState } from "react";

import { Attachment } from "@/services/shared/attachment";
import { Homework as SharedHomework } from "@/services/shared/homework";
import { generateId } from "@/utils/generateId";
import { warn } from "@/utils/logger/logger";

import { getDatabaseInstance, useDatabase } from "./DatabaseProvider";
import Homework from "./models/Homework";
import { safeWrite } from "./utils/safeTransaction";

function mapHomeworkToShared(homework: Homework): SharedHomework {
  return {
    id: homework.homeworkId,
    subject: homework.subject,
    content: homework.content,
    dueDate: new Date(homework.dueDate),
    isDone: homework.isDone,
    returnFormat: homework.returnFormat,
    attachments: parseJsonArray(homework.attachments) as Attachment[],
    evaluation: homework.evaluation,
    custom: homework.custom,
    createdByAccount: homework.createdByAccount,
    kidName: homework.kidName,
    fromCache: true,
  };
}

export function getHomeworkRouteId(homework: SharedHomework): string {
  return generateId(
    homework.subject +
      homework.content +
      homework.createdByAccount +
      homework.dueDate.toDateString()
  );
}

export async function getHomeworkById(id: string): Promise<SharedHomework | undefined> {
  const database = getDatabaseInstance();
  const records = await database
    .get<Homework>("homework")
    .query(Q.where("homeworkId", id))
    .fetch();
  const cachedHomework = records[0] ? mapHomeworkToShared(records[0]) : undefined;

  // A custom task only exists in the database: no service can refresh it.
  if (!cachedHomework || cachedHomework.custom) return cachedHomework;

  try {
    const { getManager } = await import("@/services/shared");
    const manager = getManager();
    const freshHomeworks = await manager?.getHomeworks(
      getWeekNumberFromDate(cachedHomework.dueDate)
    );
    return freshHomeworks?.find(homework => getHomeworkRouteId(homework) === id) ?? cachedHomework;
  } catch (error) {
    warn(`Unable to refresh homework ${id}: ${String(error)}`);
    return cachedHomework;
  }
}

export function useHomeworkForWeek(weekNumber: number, refresh = 0) {
  const database = useDatabase();
  const [homeworks, setHomeworks] = useState<SharedHomework[]>([]);

  useEffect(() => {
    const fetchHomeworks = async () => {
      const homeworksFetched = await getHomeworksFromCache(weekNumber);
      setHomeworks(homeworksFetched);
    };
    fetchHomeworks();
  }, [weekNumber, refresh, database]);

  return homeworks;
}

// Reads several weeks in one pass so a pager can render neighbouring weeks
// without waiting for their own effect to run. Weeks that drop out of the
// requested window are kept for one step, so scrolling back does not flash an
// empty page before the query resolves.
export function useHomeworkForWeeks(weekNumbers: number[], refresh = 0) {
  const database = useDatabase();
  const [homeworks, setHomeworks] = useState<Record<number, SharedHomework[]>>({});
  const weeksKey = weekNumbers.join(",");

  useEffect(() => {
    let cancelled = false;
    const weeks = weeksKey.length > 0 ? weeksKey.split(",").map(Number) : [];

    const fetchHomeworks = async () => {
      const entries = await Promise.all(
        weeks.map(async week => [week, await getHomeworksFromCache(week)] as const)
      );
      if (cancelled) {
        return;
      }
      setHomeworks(previous => {
        const next: Record<number, SharedHomework[]> = {};
        // Anything further than one window away is dropped: the map would grow
        // for the whole session otherwise.
        const keep = Math.max(...weeks.map(week => Math.abs(week - weeks[0]))) + 1;
        for (const [key, value] of Object.entries(previous)) {
          if (Math.abs(Number(key) - weeks[0]) <= keep) {
            next[Number(key)] = value;
          }
        }
        for (const [week, value] of entries) {
          next[week] = value;
        }
        return next;
      });
    };

    if (weeks.length > 0) {
      fetchHomeworks();
    }

    return () => {
      cancelled = true;
    };
  }, [weeksKey, refresh, database]);

  return homeworks;
}

export async function getHomeworksFromCache(
  weekNumber: number
): Promise<SharedHomework[]> {
  try {
    const database = getDatabaseInstance();
    const { start, end } = getDateRangeOfWeek(weekNumber);
    const homeworks = await database
      .get<Homework>("homework")
      .query(Q.where("dueDate", Q.between(start.getTime(), end.getTime())))
      .fetch();

    return homeworks
      .map(mapHomeworkToShared)
      .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  } catch (e) {
    warn(String(e));
    return [];
  }
}

/**
 * Mirrors one week of service homework into the database.
 *
 * `weekNumber` is the week that was asked for: when the service answers with
 * nothing, the week is still known, so homework removed by a teacher is swept
 * away instead of lingering forever. Every write (deletions included, which
 * WatermelonDB refuses outside a writer) happens in one transaction.
 */
export async function addHomeworkToDatabase(homeworks: SharedHomework[], weekNumber?: number) {
  const week = weekNumber ?? (homeworks[0] ? getWeekNumberFromDate(homeworks[0].dueDate) : undefined);
  if (week === undefined) {
    return;
  }

  const db = getDatabaseInstance();
  const { start, end } = getDateRangeOfWeek(week);
  const collection = db.get<Homework>("homework");

  await safeWrite(
    db,
    async () => {
      const dbHomeworks = await collection
        .query(Q.where("dueDate", Q.between(start.getTime(), end.getTime())))
        .fetch();

      const freshIds = new Set(homeworks.map(hw => getHomeworkRouteId(hw)));
      // Only the services that answered are swept: another service's homework
      // (or a custom task) in the same week is none of this response's business.
      const refreshedServiceIds = new Set(homeworks.map(hw => hw.createdByAccount));
      if (homeworks.length === 0) {
        for (const record of dbHomeworks) {
          if (!record.custom) { refreshedServiceIds.add(record.createdByAccount); }
        }
      }

      const operations: Model[] = [];
      const byId = new Map<string, Homework>();
      for (const record of dbHomeworks) {
        const stale =
          !record.custom &&
          refreshedServiceIds.has(record.createdByAccount) &&
          !freshIds.has(record.homeworkId);
        if (stale) {
          operations.push(record.prepareDestroyPermanently());
        } else {
          byId.set(record.homeworkId, record);
        }
      }

      const seen = new Set<string>();
      for (const hw of homeworks) {
        const id = getHomeworkRouteId(hw);
        // The same task listed twice would be created twice.
        if (seen.has(id)) { continue; }
        seen.add(id);
        const fields = {
          subject: hw.subject,
          content: hw.content,
          dueDate: hw.dueDate.getTime(),
          isDone: hw.isDone,
          returnFormat: hw.returnFormat,
          attachments: JSON.stringify(hw.attachments),
          evaluation: hw.evaluation,
          custom: hw.custom,
          createdByAccount: hw.createdByAccount,
          kidName: hw.kidName,
          fromCache: true,
        };

        let existing = byId.get(id);
        if (!existing) {
          // Due date moved to another week: the record is outside the range above.
          existing = (await collection.query(Q.where("homeworkId", id)).fetch())[0];
        }

        if (existing) {
          operations.push(existing.prepareUpdate(record => { Object.assign(record, fields); }));
        } else {
          operations.push(collection.prepareCreate(record => { Object.assign(record, { homeworkId: id, ...fields }); }));
        }
      }

      if (operations.length > 0) {
        await db.batch(operations);
      }
    },
    10000,
    "addHomeworkToDatabase"
  );
}

/**
 * Saves a task the user wrote themselves. Unlike `addHomeworkToDatabase`, the
 * rest of the week is left alone: there is no service response to diff it
 * against. The id derives from the subject, content and due date, so editing
 * any of them moves the task to a new id; `replacedId` is the one it leaves.
 */
export async function saveCustomHomework(
  homework: SharedHomework,
  replacedId?: string
): Promise<string> {
  const db = getDatabaseInstance();
  const id = getHomeworkRouteId(homework);
  const fields = {
    subject: homework.subject,
    content: homework.content,
    dueDate: homework.dueDate.getTime(),
    isDone: homework.isDone,
    returnFormat: homework.returnFormat,
    attachments: JSON.stringify(homework.attachments),
    evaluation: homework.evaluation,
    custom: true,
    createdByAccount: homework.createdByAccount,
    kidName: homework.kidName,
    fromCache: true,
  };

  await safeWrite(
    db,
    async () => {
      if (replacedId && replacedId !== id) {
        const previous = await db
          .get<Homework>("homework")
          .query(Q.where("homeworkId", replacedId))
          .fetch();
        for (const record of previous) {
          await record.destroyPermanently();
        }
      }

      const existing = await db
        .get<Homework>("homework")
        .query(Q.where("homeworkId", id))
        .fetch();

      if (existing.length > 0) {
        await existing[0].update(record => {
          Object.assign(record, fields);
        });
      } else {
        await db.get<Homework>("homework").create(record => {
          Object.assign(record, { homeworkId: id, ...fields });
        });
      }
    },
    10000,
    "saveCustomHomework"
  );

  return id;
}

export async function deleteHomeworkFromDatabase(homeworkId: string) {
  const db = getDatabaseInstance();

  const existing = await db
    .get<Homework>("homework")
    .query(Q.where("homeworkId", homeworkId))
    .fetch();

  await safeWrite(
    db,
    async () => {
      for (const record of existing) {
        await record.destroyPermanently();
      }
    },
    10000,
    "deleteHomeworkFromDatabase"
  );
}

export async function updateHomeworkIsDone(
  homeworkId: string,
  isDone: boolean
) {
  const db = getDatabaseInstance();

  const existing = await db
    .get("homework")
    .query(Q.where("homeworkId", homeworkId))
    .fetch();

  if (existing.length === 0) {
    warn(`Homework with ID ${homeworkId} not found`);
    return;
  }

  const recordToUpdate = existing[0];

  await safeWrite(
    db,
    async () => {
      await recordToUpdate.update((record: Model) => {
        const homework = record as Homework;
        homework.isDone = isDone;
      });
    },
    10000,
    "updateHomeworkIsDone"
  );
}

export function getDateRangeOfWeek(
  weekNumber: number,
  year = new Date().getFullYear()
) {
  const janFirst = new Date(year, 0, 1);
  const daysOffset = (weekNumber - 1) * 7;
  const weekStart = new Date(janFirst.setDate(janFirst.getDate() + daysOffset));
  const day = weekStart.getDay();
  const diff = weekStart.getDate() - day + (day <= 4 ? 1 : 8);
  const start = new Date(weekStart.setDate(diff));
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

export function parseJsonArray(s: string): unknown[] {
  try {
    const result = JSON.parse(s);
    return Array.isArray(result) ? result : [];
  } catch {
    return [];
  }
}

export function getWeekNumberFromDate(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor(
    (date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
  );
  return Math.ceil((days + startOfYear.getDay() + 1) / 7);
}
