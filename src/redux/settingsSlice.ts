import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsState } from '../shared/interfaces';

const initialState: SettingsState = {
  locale: 'en',
  theme: 'light',
  loading: false,
  maxHeight: 0,
};

const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    toggleLocale: (state, action: PayloadAction<string>) => {
      state.locale = action.payload;
    },
    toggleTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    toggleLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setMaxHeight: (state, action: PayloadAction<number>) => {
      state.maxHeight = action.payload;
    },
  },
});

export const { toggleLocale, toggleTheme, toggleLoading, setMaxHeight } = localeSlice.actions;
export default localeSlice.reducer;
