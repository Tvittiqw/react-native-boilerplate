import languages from "./lang";

declare module 'react-i18next' {
    interface CustomTypeOptions {
        resources: typeof languages.en
    }
}