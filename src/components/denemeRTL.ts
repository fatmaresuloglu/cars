import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {I18nManager} from 'react-native';
import {setLanguage} from '../store/slices/languageSlice';
import {store} from '../store/storeIndex';

const LANGUAGE_KEY = 'appLanguage';

export const setLanguageAndDirection = async (lang: 'tr' | 'en' | 'ar') => {
  //const isRTL = lang === 'ar';

  // Redux ile dili değiştir
  store.dispatch(setLanguage(lang));

  const [isRTL, setIsRTL] = useState(I18nManager.isRTL);
  const newRTL = !isRTL;
  I18nManager.allowRTL(newRTL);
  I18nManager.forceRTL(newRTL);
  setIsRTL(newRTL);
  console.debug('set rtl: ', newRTL);
  // AsyncStorage'e kaydet
  await AsyncStorage.setItem(LANGUAGE_KEY, lang);

  if (I18nManager.isRTL !== newRTL) {
    I18nManager.allowRTL(newRTL);
    I18nManager.forceRTL(newRTL);
    setIsRTL(newRTL);
  }
  //setTimeout(() => {
  //RNRestart.Restart();
  //}, 100);
  // } else if (I18nManager.isRTL === isRTL) {
  //   I18nManager.allowRTL(isRTL);
  //   I18nManager.forceRTL(isRTL);

  //   setTimeout(() => {
  //     RNRestart.Restart();
  //   }, 100);
  // }
};
