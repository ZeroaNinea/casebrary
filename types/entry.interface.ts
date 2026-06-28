export enum EntryType {
  Folder,
  Note,
}

export type PropertyValue = string | number | boolean | null;

export interface PropertyDefinition {
  id: string;
  name: string;
  type:
    | 'text'
    | 'number'
    | 'boolean'
    | 'date'
    | 'url'
    | 'color'
    | 'image'
    | 'icon';
}

export default interface Entry {
  id: string;
  parentId: string | null;

  type: EntryType;

  title: string;

  properties: Record<string, PropertyValue>;

  createdAt: number;
  updatedAt: number;
}
