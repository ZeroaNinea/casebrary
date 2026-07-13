import { createAsyncThunk } from '@reduxjs/toolkit';

import EntryRepository from '@/repositories/entry.repository';
import EntryService from '@/repositories/entry.service';

import CreateEntryDto from '@/types/create-entry.dto';
import UpdateEntryDto from '@/types/update-entry.dto';

import Entry from '@/types/entry.interface';

const repository = new EntryRepository();
const service = new EntryService(repository);

export const fetchEntries = createAsyncThunk(
  'entries/fetchEntries',
  async () => {
    return service.getAll();
  },
);

export const createEntry = createAsyncThunk(
  'entries/createEntry',
  async (data: CreateEntryDto) => {
    return service.create(data);
  },
);

export const updateEntry = createAsyncThunk(
  'entries/updateEntry',
  async ({ id, updates }: UpdateEntryDto) => {
    await service.update(id, updates);
    return { id, updates };
  },
);

export const deleteEntry = createAsyncThunk(
  'entries/deleteEntry',
  async (id: string) => {
    await service.delete(id);
    return id;
  },
);

export const moveEntry = createAsyncThunk(
  'entries/moveEntry',
  async ({
    draggedId,
    targetId,
    position,
  }: {
    draggedId: string;
    targetId: string;
    position: 'before' | 'after' | 'inside';
  }) => {
    return await service.move(draggedId, targetId, position);
  },
);

export const importEntries = createAsyncThunk(
  'entries/importEntries',
  async (entries: Entry[]) => {
    return await service.import(entries);
  },
);
