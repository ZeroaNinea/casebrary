import { EntryIcon } from '@/utils/icons';

export type PropertyType =
  | 'text'
  | 'number'
  | 'boolean'
  | 'date'
  | 'url'
  | 'icon'
  | 'image';

export const propertyTypes: PropertyType[] = [
  'text',
  'number',
  'boolean',
  'date',
  'url',
  'image',
];

export interface PropertyDefinition {
  id: string;
  name: string;
  type: PropertyType;
}

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  value: string | number | boolean | null;
}

export default interface Entry {
  id: string;
  parentId: string | null;

  title: string;
  icon?: EntryIcon;
  color?: string;
  order?: number;

  properties: Property[];

  createdAt: number;
  updatedAt: number;
}
