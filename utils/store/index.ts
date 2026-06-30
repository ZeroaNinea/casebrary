import { configureStore } from '@reduxjs/toolkit';
import entriesSlice from '@/features/entries/entries.slice';

const store = configureStore({
  reducer: {
    entries: entriesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
