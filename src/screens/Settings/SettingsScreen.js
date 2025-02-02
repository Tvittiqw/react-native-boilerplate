import React, {useCallback, useEffect, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import RNPickerSelect from 'react-native-picker-select';
import appLanguagesList from '../../constants/languages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/auth/authSlice';
import {useThemeContext} from '../../context/theme/ThemeProvider';
import AnimatedLoader from 'react-native-animated-loader';
import themeModesList from '../../constants/themeModes';

const SettingsScreen = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();

  const [selectedLanguage, setSelectedLanguage] = useState(() =>
    appLanguagesList.find(el => el.value === i18n.language),
  );
  const {themeMode, changeThemeMode} = useThemeContext();
  const [localSelectedThemeMode, setLocalSelectedThemeMode] = useState(() =>
    themeModesList.find(el => el.value === themeMode),
  );

  const [isSelected, setSelected] = useState(false);
  const {isRequestLoading} = useSelector(state => state.loading);

  const setupLanguageHandler = useCallback(async () => {
    if (selectedLanguage?.value) {
      await i18n.changeLanguage(selectedLanguage.value);
      await AsyncStorage.setItem('@language', selectedLanguage?.value);
    }
  }, [selectedLanguage, i18n]);

  const saveInStorageThemeConfig = useCallback(async () => {
    if (localSelectedThemeMode?.value) {
      changeThemeMode(localSelectedThemeMode.value);
      await AsyncStorage.setItem('@themeMode', localSelectedThemeMode.value);
    }
  }, [localSelectedThemeMode, changeThemeMode]);

  useEffect(() => {
    if (isSelected && Platform.OS === 'android') {
      setupLanguageHandler();
      setSelected(false);
    }
  }, [isSelected, setupLanguageHandler]);

  const onLogoutPress = async () => {
    await dispatch(logout());
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text>{t('settings.title')}</Text>

        <View style={styles.userInfoContainer}>
          <Text>User Info</Text>
        </View>

        {Platform.OS === 'ios' ? (
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            placeholder={{}}
            value={localSelectedThemeMode?.value}
            items={themeModesList}
            onValueChange={value => {
              const mode = themeModesList.find(el => el.value === value);
              setLocalSelectedThemeMode(mode);
            }}
            style={pickerStyles}
            onDonePress={saveInStorageThemeConfig}>
            <Text>{t('settings.dynamic_theme')}</Text>
          </RNPickerSelect>
        ) : (
          <RNPickerSelect
            fixAndroidTouchableBug
            placeholder={{label: 'Select theme mode', color: 'gray'}}
            onValueChange={async value => {
              const mode = themeModesList.find(el => el.value === value);
              await AsyncStorage.setItem('@themeMode', mode.value);
              changeThemeMode(mode.value);
            }}
            items={themeModesList}>
            <Text>{t('settings.dynamic_theme')}</Text>
          </RNPickerSelect>
        )}

        {Platform.OS === 'ios' ? (
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            placeholder={{}}
            value={selectedLanguage?.value}
            items={appLanguagesList}
            onValueChange={value => {
              const lang = appLanguagesList.find(el => el.value === value);
              setSelectedLanguage(lang);
            }}
            style={pickerStyles}
            onDonePress={setupLanguageHandler}>
            <Text>{t('settings.change_lang')}</Text>
          </RNPickerSelect>
        ) : (
          <RNPickerSelect
            fixAndroidTouchableBug
            placeholder={{label: 'Select language', color: 'gray'}}
            onValueChange={value => {
              const lang = appLanguagesList.find(el => el.value === value);
              setSelectedLanguage(lang);
              setSelected(true);
            }}
            items={appLanguagesList}>
            <Text>{t('settings.change_lang')}</Text>
          </RNPickerSelect>
        )}

        <TouchableOpacity style={styles.aboutContainer}>
          <Text style={styles.navLink}>{t('settings.about_link')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutContainer}
          onPress={() => onLogoutPress()}>
          <Text style={styles.navLink}>{t('settings.logout_text')}</Text>
        </TouchableOpacity>
      </View>
      <AnimatedLoader
        visible={isRequestLoading}
        overlayColor="rgba(255,255,255,0.75)"
        source={require('../../config/loader.json')}
        animationStyle={styles.lottie}
        speed={1}>
        <Text>Logout...</Text>
      </AnimatedLoader>
    </SafeAreaView>
  );
};

export const pickerStyles = {
  done: {
    fontSize: 14,
    // color: COLORS.NEW_COLORS.DARK_GRAY
  },
  chevronContainer: {
    display: 'none',
  },
  modalViewTop: {
    // backgroundColor: COLORS.HEADER.MODAL_BACKGROUND
  },
  modalViewMiddle: {
    // backgroundColor: COLORS.NEW_COLORS.GRAY,
    justifyContent: 'flex-end',
  },
  modalViewBottom: {
    // backgroundColor: COLORS.WHITE,
  },
};

export default SettingsScreen;
