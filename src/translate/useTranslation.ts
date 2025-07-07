import {languages} from '../languages/language';
import {useAppSelector} from '../store/hooks';

export const useTranslation = () => {
  const currentLang = useAppSelector(state => state.language.language);
  const t = languages[currentLang];

  return {t};
};
