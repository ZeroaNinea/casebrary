import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import EntryRepository from '@/repositories/entry.repository';
import Entry from '@/types/entry.interface';

const fetchEntries = createAsyncThunk('entries/fetchEntries', async () => {
  const entryRepository = new EntryRepository();
  const entries = await entryRepository.getAllEntries();
  return entries;
});

export const entriesSlice = createSlice({
  name: 'entries',
  initialState: [] as Entry[],
  reducers: {
    createEntry(state, action) {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEntries.fulfilled, (state, action) => {
      state.push(...action.payload);
    });
  },
});

export default entriesSlice;
