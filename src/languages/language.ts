import en from './en.json';
import sa from './sa.json';
import tr from './tr.json';

export const languages = {
  tr,
  en,
  sa,
};

export type LanguageCode = keyof typeof languages;
