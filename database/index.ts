import { Database } from '@nozbe/watermelondb';
import logger from '@nozbe/watermelondb/utils/common/logger';

// WatermelonDB's internal work-queue diagnostics ("Enqueued writer",
// "can't be performed yet, because there are N other readers/writers...")
// are purely informational dev-mode noise, not error reporting — our own
// database/utils/safeTransaction.ts handles real failure logging separately.
logger.silence();
import { Absence, Attendance, Delay, Observation, Punishment } from '@/database/models/Attendance';
import CanteenMenu from '@/database/models/CanteenMenu';
import { Chat, Message, Recipient } from '@/database/models/Chat';
import Event from '@/database/models/Event';
import { Grade, Period, PeriodGrades } from '@/database/models/Grades';
import Homework from "@/database/models/Homework";
import Ical from '@/database/models/Ical';
import News from '@/database/models/News';
import Subject from '@/database/models/Subject';
import Course from '@/database/models/Timetable';

import { Balance } from './models/Balance';
import CanteenHistoryItem from './models/CanteenHistory';
import Kid from './models/Kid';
import { createAdapter } from './adapter';

const adapter = createAdapter();

export const database = new Database({
  adapter,
  modelClasses: [
    Event,
    Ical,
    Subject, 
    Homework,
    News,
    Period,
    Grade,
    PeriodGrades,
    Attendance,
    Delay,
    Observation,
    Absence,
    Punishment,
    CanteenMenu,
    Chat,
    Message,
    Recipient,
    Course,
    Kid,
    Balance,
    CanteenHistoryItem
  ],
});
