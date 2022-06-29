import React, {useCallback, useContext, useEffect, useState} from 'react';
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
import {DynamicTheme} from '../../navigation/StackNavigator';
import RNPickerSelect from 'react-native-picker-select';
import appLanguagesList from '../../consants/languages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/auth/authSlice';

const SettingsScreen = ({navigation}) => {
  const {t, i18n} = useTranslation();

  const dispatch = useDispatch();

  const [selectedLanguage, setSelectedLanguage] = useState(() =>
    appLanguagesList.find(el => el.value === i18n.language),
  );

  const [isSelected, setSelected] = useState(false);

  const {isDynamic, changeDynamicStatus} = useContext(DynamicTheme);

  const setupLanguageHandler = useCallback(async () => {
    if (selectedLanguage?.value) {
      await i18n.changeLanguage(selectedLanguage.value);
      await AsyncStorage.setItem('@language', selectedLanguage?.value);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    if (isSelected && Platform.OS === 'android') {
      setupLanguageHandler();
      setSelected(false);
    }
  }, [isSelected, setupLanguageHandler]);

  const onLogoutPress = async () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text>{t('settings.title')}</Text>

        <View style={styles.userInfoContainer}>
          <Text>User Info</Text>
        </View>

        <View style={styles.themeContainer}>
          <Text>{t('settings.dynamic_theme')}</Text>

          <Switch value={isDynamic} onChange={changeDynamicStatus} />
        </View>

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
