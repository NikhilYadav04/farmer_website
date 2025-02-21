import { configureStore } from '@reduxjs/toolkit';
import uploaderReducer from './hooks/uploaderSlice';

export const store = configureStore({
  reducer: {
    uploader: uploaderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Bypasses error (not ideal)
    }),
});
