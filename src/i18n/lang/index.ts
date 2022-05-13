import en from '../../../public/locales/en/translation.json';
import ru from '../../../public/locales/ru/translation.json';

type LanguagesType = {
  en: typeof en;
  ru: typeof ru;
};

const languages: LanguagesType = {
  en,
  ru,
};

export default languages;
