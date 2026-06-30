import { createSlice } from '@reduxjs/toolkit';
import EntriesState from '@/types/entries-state.interface';
import {
  fetchEntries,
  createEntry as createEntryThunk,
} from './entries.thunks';

export const entriesSlice = createSlice({
  name: 'entries',
  initialState: {
    entries: [],
    loading: false,
    error: null,
  } as EntriesState,
  reducers: {
    createEntry(state, action) {
      state.entries.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEntries.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = action.payload;
      })
      .addCase(fetchEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(createEntryThunk.fulfilled, (state, action) => {
        state.entries.push(action.payload);
      });
  },
});

export const { createEntry } = entriesSlice.actions;
export default entriesSlice;
