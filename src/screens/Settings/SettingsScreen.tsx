import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import {Platform, SafeAreaView, Switch, Text, TouchableOpacity, View} from "react-native";
import {BottomTabProps} from "../../types/navigationTypes";
import {useTranslation} from "react-i18next";
import styles from "./styles";
import {DynamicTheme} from "../../navigation/StackNavigator";
import RNPickerSelect, {PickerStyle} from 'react-native-picker-select';
import appLanguagesList from "../../consants/languages";
import TypedAsyncStorage from "../../utils/asyncStorageTyped";

type NavigationProps = BottomTabProps<"Settings">

const SettingsScreen: FC<NavigationProps> = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const [selectedLanguage, setSelectedLanguage] = useState(() =>
        appLanguagesList.find((el) => el.value === i18n.language));

    const [isSelected, setSelected] = useState(false);

    const { isDynamic, changeDynamicStatus } = useContext(DynamicTheme);

    const setupLanguageHandler = useCallback(async () => {
        if (selectedLanguage?.value) {
            await i18n.changeLanguage(selectedLanguage.value);
            await TypedAsyncStorage.setItem('@language', selectedLanguage?.value)
        }

    }, [selectedLanguage]);

    useEffect(() => {
        if (isSelected && Platform.OS === "android") {
            setupLanguageHandler()
            setSelected(false);
        }
    }, [isSelected, setupLanguageHandler])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>

                <Text>{t('settings.title')}</Text>

                <View style={styles.userInfoContainer}>
                    <Text>User Info</Text>
                </View>

                <View style={styles.themeContainer}>
                    <Text>{t('settings.dynamic_theme')}</Text>

                    <Switch
                        value={isDynamic}
                        onChange={changeDynamicStatus}
                    />
                </View>

                {Platform.OS === "ios" ? (
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        placeholder={{}}
                        value={selectedLanguage?.value}
                        items={appLanguagesList}
                        onValueChange={(value) => {
                            const lang = appLanguagesList.find((el) => el.value === value)
                            setSelectedLanguage(lang)
                        }}
                        style={pickerStyles}
                        onDonePress={setupLanguageHandler}
                    >
                        <Text>{t('settings.change_lang')}</Text>
                    </RNPickerSelect>
                ) : (
                    <RNPickerSelect
                        fixAndroidTouchableBug
                        placeholder={{ label: "Select language", color: "gray" }}
                        onValueChange={(value) => {
                            const lang = appLanguagesList.find((el) => el.value === value)
                            setSelectedLanguage(lang)
                            setSelected(true);
                        }}
                        items={appLanguagesList}
                    >
                        <Text>{t('settings.change_lang')}</Text>
                    </RNPickerSelect>
                    )
                    }

            </View>
        </SafeAreaView>
    );
};

export const pickerStyles: PickerStyle = {
    done: {
        fontSize: 14,
        // color: COLORS.NEW_COLORS.DARK_GRAY
    },
    chevronContainer: {
        display: "none",
    },
    modalViewTop: {
        // backgroundColor: COLORS.HEADER.MODAL_BACKGROUND
    },
    modalViewMiddle: {
        // backgroundColor: COLORS.NEW_COLORS.GRAY,
        justifyContent: "flex-end"
    },
    modalViewBottom: {
        // backgroundColor: COLORS.WHITE,
    },
};

export default SettingsScreen;