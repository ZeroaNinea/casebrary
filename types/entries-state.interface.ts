import Entry from '@/types/entry.interface';

export default interface EntriesState {
  entries: Entry[];
  loading: boolean;
  error: string | null;
}
