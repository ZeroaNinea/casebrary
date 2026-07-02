// export enum EntryType {
//   Folder,
//   Note,
// }

// export type PropertyValue = string | number | boolean | null;

export interface PropertyDefinition {
  id: string;
  name: string;
  type: 'text' | 'number' | 'boolean' | 'date' | 'url' | 'image';
}

export default interface Entry {
  id: string;
  parentId: string | null;

  title: string;
  icon?: string;
  color?: string;
  order?: number;

  properties: PropertyDefinition[];

  createdAt: number;
  updatedAt: number;
}
