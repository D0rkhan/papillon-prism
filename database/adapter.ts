import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { File, Paths } from 'expo-file-system';
import { Platform } from 'react-native';

import { mySchema } from './schema';

const appGroupId = 'group.xyz.getpapillon.ios';
const databaseFilename = 'watermelon.db';

function resolveSharedDbName(): string | undefined {
  if (Platform.OS !== 'ios') return undefined;

  const sharedContainer = Paths.appleSharedContainers[appGroupId];
  if (!sharedContainer) return undefined;

  const sharedFile = new File(sharedContainer, databaseFilename);
  const legacyFile = new File(Paths.document, databaseFilename);

  if (!sharedFile.exists && legacyFile.exists) {
    legacyFile.copySync(sharedFile);
  }

  return sharedFile.uri.replace(/^file:\/\//, '');
}

/** Android / iOS: native SQLite (JSI). */
export function createAdapter() {
  return new SQLiteAdapter({
    schema: mySchema,
    dbName: resolveSharedDbName(),
  });
}
