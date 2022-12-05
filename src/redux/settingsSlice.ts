import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsState } from '../shared/interfaces';
import i18n from 'i18next';

const initialState: SettingsState = {
  locale: 'en',
  theme: 'light',
  loading: false,
  maxHeight: 0,
  showOffcanvas: false,
};

const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    toggleLocale: (state, action: PayloadAction<string>) => {
      state.locale = action.payload;
      i18n.changeLanguage(action.payload);
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
    closeOffcanvas: (state) => {
      state.showOffcanvas = false;
    },
    openOffcanvas: (state) => {
      state.showOffcanvas = true;
    },
  },
});

export const {
  toggleLocale,
  toggleTheme,
  toggleLoading,
  setMaxHeight,
  closeOffcanvas,
  openOffcanvas,
} = localeSlice.actions;
export default localeSlice.reducer;
