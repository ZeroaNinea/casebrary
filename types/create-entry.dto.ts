import { EntryIcon } from '@/utils/icons';
import { Property } from './entry.interface';

export default interface CreateEntryDto {
  parentId: string | null;
  title: string;
  icon?: EntryIcon;
  color?: string;
  properties?: Property[];
}
