export enum EntryType {
  Folder,
  Note,
}

export type PropertyValue = string | number | boolean | null;

export interface PropertyDefinition {
  id: string;
  name: string;
  type: 'text' | 'number' | 'boolean' | 'date' | 'url' | 'image';
}

export default interface Entry {
  id: string;
  parentId: string | null;

  type: EntryType;

  title: string;
  icon?: string;
  color?: string;
  order?: number;

  propertyDefinitions?: PropertyDefinition[];
  properties: Record<string, PropertyValue>;

  createdAt: number;
  updatedAt: number;
}
