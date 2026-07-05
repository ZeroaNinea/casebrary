import EntryRepository from '@/repositories/entry.repository';
import Entry from '@/types/entry.interface';
import CreateEntryDto from '@/types/create-entry.dto';

export default class EntryService {
  constructor(private repository = new EntryRepository()) {}

  async create(data: CreateEntryDto): Promise<Entry> {
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
    await this.repository.update(id, updates);
  }

  async delete(id: string) {
    await this.repository.delete(id);
  }

  async getAll() {
    return this.repository.getAllEntries();
  }
}
