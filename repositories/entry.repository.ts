import { dbPromise } from '../database/db';
import Entry from '../types/entry.interface';

export default class EntryRepository {
  async create(entry: Entry) {
    const db = await dbPromise;
    await db.put('entries', entry);
  }

  async delete(id: string) {
    const db = await dbPromise;
    await db.delete('entries', id);
  }

  async update(entry: Entry) {
    const db = await dbPromise;
    entry.updatedAt = Date.now();
    await db.put('entries', entry);
  }

  async getChildren(parentId: string | null) {
    const db = await dbPromise;
    const entries = await db.getAll('entries');
    return entries.filter((entry) => entry.parentId === parentId);
  }

  async getAllEntries() {
    const db = await dbPromise;
    return db.getAll('entries');
  }
}
