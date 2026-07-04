import { createAsyncThunk } from '@reduxjs/toolkit';

import EntryRepository from '@/repositories/entry.repository';
import EntryService from '../../repositories/entry.service';

import CreateEntryDto from '@/types/create-entry.dto';

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
