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

  // async getSiblings(parentId: string) {
  //   const db = await dbPromise;

  //   return db.getAllFromIndex('entries', 'parentId', parentId);
  // }

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

  async move(entry: Entry, newParentId: string | null, newOrder: number) {
    const db = await dbPromise;

    await this.closeGap(entry.parentId, entry.order);
    await this.makeRoom(newParentId, newOrder);

    if (entry.parentId === newParentId && newOrder > entry.order) {
      newOrder--;
    }

    const movedEntry = {
      ...entry,
      parentId: newParentId,
      order: newOrder,
      updatedAt: Date.now(),
    };

    await db.put('entries', movedEntry);

    if (entry.parentId === newParentId) {
      return await this.getChildren(newParentId);
    }

    const updated = [
      ...(await this.getChildren(entry.parentId)),
      ...(await this.getChildren(newParentId)),
      movedEntry,
    ];

    return updated;
  }

  private async closeGap(parentId: string | null, order: number) {
    const db = await dbPromise;
    const siblings = await this.getChildren(parentId);

    for (const sibling of siblings) {
      if (sibling.order > order) {
        sibling.order--;
        await db.put('entries', sibling);
      }
    }
  }

  private async makeRoom(parentId: string | null, order: number) {
    const db = await dbPromise;
    const siblings = await this.getChildren(parentId);

    for (const sibling of siblings) {
      if (sibling.order >= order) {
        sibling.order++;
        await db.put('entries', sibling);
      }
    }
  }

  async isDescendant(possibleDescendantId: string | null, ancestorId: string) {
    if (possibleDescendantId === null) {
      return false;
    }

    let current = await this.get(possibleDescendantId);

    while (current.parentId !== null) {
      if (current.parentId === ancestorId) {
        return true;
      }

      current = await this.get(current.parentId);
    }

    return false;
  }

  async import(entries: Entry[]) {
    const db = await dbPromise;

    const tx = db.transaction('entries', 'readwrite');

    // const rootEntries = await this.getChildren(null);
    const rootEntries = entries
      .filter((e) => e.parentId === null)
      .sort((a, b) => a.order - b.order);
    let nextRootOrder = rootEntries.length;
    const ids = new Set(entries.map((e) => e.id));

    for (const entry of entries) {
      if (
        entry.parentId !== null &&
        !ids.has(entry.parentId) &&
        !(await db.get('entries', entry.parentId))
      ) {
        throw new Error(`Missing parent: ${entry.parentId}`);
      }
    }

    for (const entry of entries) {
      const imported = { ...entry };

      if (imported.parentId === null) {
        imported.order = nextRootOrder++;
      }

      await tx.store.put(imported);
    }

    // await tx.store.clear();

    // for (const entry of entries) {
    //   await tx.store.put(entry);
    // }

    await tx.done;

    return await this.getAllEntries();
  }
}
