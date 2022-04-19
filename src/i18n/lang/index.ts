import en from "./en/en.json";
import ru from "./ru/ru.json"

type LanguagesType = {
    en: typeof en
    ru: typeof ru
}

const languages: LanguagesType = {
    en,
    ru,
}

export default languages;