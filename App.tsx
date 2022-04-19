import React, {FC, useEffect, useState} from 'react';
import {Provider} from "react-redux";
import store from "./src/redux/store";
import StackNavigator from "./src/navigation/StackNavigator";
import {SplashScreen} from "./src/screens";
import TypedAsyncStorage from "./src/utils/asyncStorageTyped";
import {useTranslation} from "react-i18next";


const App: FC = () => {

    const [isInitApp, setInitApp] = useState(false);

    const [isSettingsSetup, setSettingsSetup] = useState(false);
    const [splashAnimationFinish, setSplashAnimationFinish] = useState(false)
    const [isDynamicTheme, setDynamicTheme] = useState<boolean | null>(null);

    const { i18n } = useTranslation();

    const checkAuth = async () => {
        const token = await TypedAsyncStorage.getItem("@token");
        if (token) {

        } else {

        }
    }

    const setupThemeSettings = async () => {
        const dynamicThemeStatus = await TypedAsyncStorage.getItem("@isDynamicTheme");
        if (dynamicThemeStatus) {
            setDynamicTheme(dynamicThemeStatus.status)
        } else {
            setDynamicTheme(true);
        }
    }

    const setupLanguageSettings = async () => {
        try {
            const lang = await TypedAsyncStorage.getItem("@language")
            if (lang) {
                await i18n.changeLanguage(lang);
            }
        } catch (err) {
            console.warn("-----lang error", err)
        }
    }

    const initAppSettings = async () => {
        await checkAuth();
        await setupThemeSettings();
        await setupLanguageSettings();
        setSettingsSetup(true);
    }

    useEffect(() => {
        initAppSettings();
    }, []);

    useEffect(() => {
        if (isSettingsSetup && splashAnimationFinish) {
            setInitApp(true)
        }
    }, [isSettingsSetup, splashAnimationFinish])

    return (
        <Provider store={store}>
            {
                !isInitApp
                    ? <SplashScreen setSplashAnimationFinish={setSplashAnimationFinish}/>
                    : <StackNavigator dynamicThemeStatus={isDynamicTheme as boolean}/>
            }
        </Provider>
    );
};

export default App;
