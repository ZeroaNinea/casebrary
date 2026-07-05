import Entry from './entry.interface';

export default interface UpdateEntryDto {
  id: string;
  updates: Partial<Entry>;
}
