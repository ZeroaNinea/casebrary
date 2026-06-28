import { dbPromise } from '../database/db';
import Entry from '../types/entry.interface';

export default class EntryRepository {
  async create(entry: Entry) {
    const db = await dbPromise;
    await db.put('entries', entry);
  }

  async delete(id: string) {
    const db = await dbPromise;

    const entry = await db.get('entries', id);

    if (!entry) {
      throw new Error('Entry not found.');
    }

    await db.delete('entries', id);
  }

  async update(id: string, updates: Partial<Entry>) {
    const db = await dbPromise;

    const entry = await db.get('entries', id);

    if (!entry) {
      throw new Error('Entry not found.');
    }

    await db.put('entries', {
      ...entry,
      ...updates,
      updatedAt: Date.now(),
    });
  }

  async getChildren(parentId: string | null) {
    const db = await dbPromise;

    if (!parentId) {
      return [];
    }

    const entry = await db.get('entries', parentId);

    if (!entry) {
      throw new Error('Entry not found.');
    }

    const entries = await db.getAll('entries');
    return entries.filter((entry) => entry.parentId === parentId);
  }

  async getAllEntries() {
    const db = await dbPromise;
    return db.getAll('entries');
  }
}
