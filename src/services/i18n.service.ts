import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { dict_en } from '../assets/i18n/en';
import { dict_ru } from '../assets/i18n/ru';

const resources = {
  ...dict_en,
  ...dict_ru,
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
