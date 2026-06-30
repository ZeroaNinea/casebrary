import { createSlice } from '@reduxjs/toolkit';
import EntryRepository from '@/repositories/entry.repository';
import Entry from '@/types/entry.interface';

const entryRepository = new EntryRepository();
const entries: Entry[] = await entryRepository.getAllEntries();

export const entriesSlice = createSlice({
  name: 'entries',
  initialState: {
    entries: [...entries],
  },
  reducers: {
    createEntry(state, action) {
      entryRepository.create(action.payload);
      state.entries.push(action.payload);
    },
  },
});

export default entriesSlice;
