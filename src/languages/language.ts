import ar from './ar.json';
import en from './en.json';
import tr from './tr.json';

export const languages = {
  tr,
  en,
  ar,
};

export type LanguageCode = keyof typeof languages;
