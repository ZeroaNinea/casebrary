import { createAsyncThunk } from '@reduxjs/toolkit';
import EntryRepository from '@/repositories/entry.repository';
import Entry from '@/types/entry.interface';

const repository = new EntryRepository();

export const fetchEntries = createAsyncThunk(
  'entries/fetchEntries',
  async () => {
    const entries = await repository.getAllEntries();
    return entries;
  },
);

export const createEntry = createAsyncThunk(
  'entries/createEntry',
  async (entry: Entry) => {
    await repository.create(entry);
    return entry;
  },
);
