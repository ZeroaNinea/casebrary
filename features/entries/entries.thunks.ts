import { createAsyncThunk } from '@reduxjs/toolkit';

import EntryRepository from '@/repositories/entry.repository';
import EntryService from './entry.service';

// import Entry from '@/types/entry.interface';
import CreateEntryDto from '@/types/create-entry.dto';

const repository = new EntryRepository();
const service = new EntryService();

export const fetchEntries = createAsyncThunk(
  'entries/fetchEntries',
  async () => {
    const entries = await repository.getAllEntries();
    return entries;
  },
);

// export const createEntry = createAsyncThunk(
//   'entries/createEntry',
//   async (entry: Entry) => {
//     await repository.create(entry);
//     return entry;
//   },
// );

export const createEntry = createAsyncThunk(
  'entries/createEntry',
  async (data: CreateEntryDto) => {
    return service.create(data);
  },
);
