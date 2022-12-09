import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DynamicTheme = createContext(null);

const ThemeProvider = ({children, themeFromSettings}) => {
  const [themeMode, setThemeMode] = useState(themeFromSettings || 'auto');

  const changeThemeMode = type => {
    setThemeMode(type);
  };

  useEffect(() => {
    setThemeMode(themeFromSettings || 'auto');
  }, [themeFromSettings]);

  const themeContextValue = {
    themeMode,
    changeThemeMode,
  };

  return (
    <DynamicTheme.Provider value={themeContextValue}>
      {children}
    </DynamicTheme.Provider>
  );
};

export default ThemeProvider;

export const useThemeContext = () => {
  const {themeMode, changeThemeMode} = useContext(DynamicTheme);
  return {
    changeThemeMode,
    themeMode,
  };
};
