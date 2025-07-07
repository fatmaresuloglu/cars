import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './slices/ThemeSlices';
import languageReducer from './slices/languageSlice';
import {api} from './slices/userSlice';

export const store = configureStore({
  reducer: {
    language: languageReducer,
    theme: themeReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
