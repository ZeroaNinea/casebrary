import EntryRepository from '@/repositories/entry.repository';
import Entry, { EntryType } from '@/types/entry.interface';
import CreateEntryDto from '@/types/create-entry.dto';

export default class EntryService {
  constructor(private repository = new EntryRepository()) {}

  async create(data: CreateEntryDto): Promise<Entry> {
    const now = Date.now();

    if (data.parentId) {
      const parent = await this.repository.get(data.parentId);

      if (parent.type !== EntryType.Folder) {
        throw new Error('Parent must be a folder.');
      }
    }

    const siblings = await this.repository.getChildren(data.parentId);
    const order = siblings.length;

    const entry: Entry = {
      id: crypto.randomUUID(),
      parentId: data.parentId,
      type: data.type,
      title: data.title.trim(),
      icon: data.icon,
      color: data.color,
      order: order,
      properties: {},
      createdAt: now,
      updatedAt: now,
    };

    await this.repository.create(entry);

    return entry;
  }
}
