import en from './en.json';
import tr from './tr.json';

export const languages = {
  tr,
  en,
};

export type LanguageCode = keyof typeof languages;
