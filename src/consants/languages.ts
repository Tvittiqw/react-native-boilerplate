type LanguageValueType = 'en' | 'ru';

type LanguageItemType = {
  label: string;
  value: LanguageValueType;
};

type LanguagesType = Array<LanguageItemType>;

const appLanguagesList: LanguagesType = [
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'Русский',
    value: 'ru',
  },
];

export default appLanguagesList;
