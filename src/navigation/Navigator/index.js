import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Appearance} from 'react-native';
import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme,
} from '@react-navigation/native';
import {useThemeContext} from '../../context/theme/ThemeProvider';
import LoggedInStack from './LoggedInStack';
import LoggedOutStack from './LoggedOutStack';


const Navigator = () => {
    const [appTheme, setAppTheme] = useState();
    const {isDynamicTheme} = useThemeContext();

    const {isAuth} = useSelector(state => state.auth);

    const themeChangeListener = useCallback(({colorScheme}) => {
        setAppTheme(colorScheme);
    }, []);

    useEffect(() => {
        if (isDynamicTheme) {
            setAppTheme(Appearance.getColorScheme());
            const unsubscribe = Appearance.addChangeListener(themeChangeListener);
            return () => unsubscribe.remove();
        } else {
            setAppTheme('light');
        }
    }, [isDynamicTheme]);

    return (
        <NavigationContainer
            theme={appTheme === 'dark' ? DarkTheme : DefaultTheme}
        >
            {isAuth ? <LoggedInStack/> : <LoggedOutStack/>}
        </NavigationContainer>
    )
}

export default Navigator;