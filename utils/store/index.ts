import { configureStore } from '@reduxjs/toolkit';
import entriesSlice from '@/features/entries/entries.slice';

export default configureStore({
  reducer: {
    entries: entriesSlice.reducer,
  },
});
