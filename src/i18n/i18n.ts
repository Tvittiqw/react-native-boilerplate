import i18n, {LanguageDetectorAsyncModule} from "i18next";
import {initReactI18next} from 'react-i18next'
import languages from "./lang";
import * as RNLocalize from "react-native-localize";

const langDetector: LanguageDetectorAsyncModule = {
    type: "languageDetector",
    async: true,
    init: () => {},
    detect: (callback) => {
        return callback(RNLocalize.getLocales()[0].languageCode);
    },
    cacheUserLanguage: () => {}
}

i18n
    .use(langDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        resources: {
            en: languages.en,
            ru: languages.ru,
        },
        react: {
            useSuspense: false,
        },
        defaultNS: "translation",
        compatibilityJSON: "v3",
    })

export default i18n;