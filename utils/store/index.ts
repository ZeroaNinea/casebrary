import { configureStore } from '@reduxjs/toolkit';
import entriesSlice from './entries.slice';

export default configureStore({
  reducer: entriesSlice.reducer,
});
