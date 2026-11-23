import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';

import { mySchema } from './schema';

/** Web / Linux desktop: LokiJS persisted in IndexedDB (no SQLite in a browser). */
export function createAdapter() {
  return new LokiJSAdapter({
    schema: mySchema,
    dbName: 'papillon-prism',
    useWebWorker: false,
    useIncrementalIndexedDB: true,
    onSetUpError: error => {
      console.error('[database] IndexedDB setup failed', error);
    },
  });
}
