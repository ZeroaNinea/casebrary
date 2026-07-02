import { PropertyDefinition } from './entry.interface';

export default interface CreateEntryDto {
  parentId: string | null;
  title: string;
  icon?: string;
  color?: string;
  properties?: PropertyDefinition[];
}
