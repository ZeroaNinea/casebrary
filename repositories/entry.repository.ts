import { dbPromise } from '../database/db';
import Entry from '@/types/entry.interface';

export default class EntryRepository {
  private verifyTitleAndId(entry: Entry) {
    if (!entry.title || !entry.id) {
      throw new Error('Entry must have a title and ID.');
    }
  }

  private verifyIfEntryExists(entry: Entry) {
    if (!entry) {
      throw new Error('Entry not found.');
    }
  }

  async create(entry: Entry) {
    const db = await dbPromise;
    const existing = await db.get('entries', entry.id);

    if (existing) {
      throw new Error('Entry already exists.');
    }

    await db.add('entries', entry);
  }

  async delete(id: string) {
    const db = await dbPromise;
    const entry = await db.get('entries', id);

    this.verifyIfEntryExists(entry);

    const children = await this.getChildren(entry.id);
    for (const child of children) {
      await this.delete(child.id);
    }

    await db.delete('entries', id);
  }

  async update(id: string, updates: Partial<Entry>) {
    const db = await dbPromise;
    const entry = await db.get('entries', id);

    this.verifyIfEntryExists(entry);
    this.verifyTitleAndId(entry);

    await db.put('entries', {
      ...entry,
      ...updates,
      updatedAt: Date.now(),
    });
  }

  async getChildren(parentId: string | null) {
    const db = await dbPromise;

    if (parentId === null) {
      const entries = await db.getAll('entries');
      return entries.filter((e) => e.parentId === null);
    }

    return db.getAllFromIndex('entries', 'parentId', parentId);
  }

  async getAllEntries() {
    const db = await dbPromise;
    return db.getAll('entries');
  }

  async get(id: string) {
    const db = await dbPromise;
    const entry = await db.get('entries', id);

    this.verifyIfEntryExists(entry);

    return entry;
  }
}
