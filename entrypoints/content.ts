import { dbPromise } from '../database/db';
import Entry, { EntryType } from '../types/entry.interface';

export default defineContentScript({
  matches: ['*://*.google.com/*'],
  async main() {
    console.log('Hello content.');

    const db = await dbPromise;

    await db.put('entries', {
      id: '1',
      title: 'Hello',
      parentId: null,
      type: EntryType.Note,
      properties: {},
      createdAt: Date.now(),
      updatedAt: Date.now(),
    } as Entry);

    console.log(await db.get('entries', '1'));

    console.log(await db.getAll('entries'));

    await db.delete('entries', '1');
  },
});
