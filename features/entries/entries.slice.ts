import { createSlice } from '@reduxjs/toolkit';
import EntriesState from '@/types/entries-state.interface';
import {
  fetchEntries,
  createEntry as createEntryThunk,
  updateEntry as updateEntryThunk,
  deleteEntry as deleteEntryThunk,
  moveEntry as moveEntryThunk,
} from './entries.thunks';

export const entriesSlice = createSlice({
  name: 'entries',
  initialState: {
    entries: [],
    loading: false,
    error: null,
  } as EntriesState,
  reducers: {
    // createEntry(state, action) {
    //   state.entries.push(action.payload);
    // },
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
      })
      .addCase(updateEntryThunk.fulfilled, (state, action) => {
        const entry = state.entries.find((e) => e.id === action.payload.id);

        if (entry) {
          Object.assign(entry, action.payload.updates);
        }
      })
      .addCase(deleteEntryThunk.fulfilled, (state, action) => {
        state.entries = state.entries.filter((e) => e.id !== action.payload);
      })
      .addCase(moveEntryThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        for (const updated of action.payload) {
          const entry = state.entries.find((e) => e.id === updated.id);

          if (entry) {
            Object.assign(entry, updated);
          }
        }
      });
  },
});

// export const { createEntry } = entriesSlice.actions;
export default entriesSlice;
