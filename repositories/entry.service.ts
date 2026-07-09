import EntryRepository from '@/repositories/entry.repository';
import Entry from '@/types/entry.interface';
import CreateEntryDto from '@/types/create-entry.dto';

export default class EntryService {
  constructor(private repository = new EntryRepository()) {}

  async create(data: CreateEntryDto): Promise<Entry> {
    const title = data.title.trim();

    if (!title) {
      throw new Error('Title cannot be empty.');
    }

    const now = Date.now();

    const siblings = await this.repository.getChildren(data.parentId);
    const order = siblings.length;

    const entry: Entry = {
      id: crypto.randomUUID(),
      parentId: data.parentId,
      title: data.title.trim(),
      icon: data.icon,
      color: data.color,
      order: order,
      properties: data.properties || [],
      createdAt: now,
      updatedAt: now,
    };

    await this.repository.create(entry);

    return entry;
  }

  async update(id: string, updates: Partial<Entry>) {
    if (updates.title !== undefined) {
      const title = updates.title.trim();

      if (!title) {
        throw new Error('Title cannot be empty.');
      }

      updates = {
        ...updates,
        title,
      };
    }

    await this.repository.update(id, updates);
  }

  async delete(id: string) {
    await this.repository.delete(id);
  }

  async getAll() {
    return this.repository.getAllEntries();
  }

  async move(id: string, newParentId: string | null, order: number) {
    const entry = await this.repository.get(id);

    if (newParentId === entry.id) {
      throw new Error('Cannot move entry to itself.');
    }

    if (await this.repository.isDescendant(newParentId, id)) {
      throw new Error('Cannot move an entry into its own descendant.');
    }

    return await this.repository.move(id, newParentId, order);
  }
}
