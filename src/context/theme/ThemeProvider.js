import React, {createContext, useCallback, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const DynamicTheme = createContext(null)

const ThemeProvider = ({ children, themeStatusFromSettings }) => {
    const [isDynamicTheme, setIsDynamicTheme] = useState(themeStatusFromSettings)

    const [isChangeThemeByToggle, setChangeThemeByToggle] = useState(false)

    const saveInStorageThemeConfig = useCallback(async () => {
        await AsyncStorage.setItem(
            '@isDynamicTheme',
            JSON.stringify(isDynamicTheme),
        )
    }, [isDynamicTheme])

    useEffect(() => {
        if (isChangeThemeByToggle) {
            saveInStorageThemeConfig()
        }
    }, [isChangeThemeByToggle, saveInStorageThemeConfig])

    useEffect(() => {
        setIsDynamicTheme(themeStatusFromSettings)
    }, [themeStatusFromSettings])

    const themeContextValue = {
        isDynamicTheme,
        changeThemeStatus: () => {
            setIsDynamicTheme(prevState => !prevState);
            setChangeThemeByToggle(true);
        },
    }

    return (
        <DynamicTheme.Provider value={themeContextValue}>
            {children}
        </DynamicTheme.Provider>
    )
}

export default ThemeProvider

export const useThemeContext = () => {
    const {isDynamicTheme, changeThemeStatus} = useContext(DynamicTheme)
    return {
        isDynamicTheme,
        changeThemeStatus
    }
}