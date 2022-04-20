import React, {FC} from 'react';
import {SafeAreaView, Text} from "react-native";
import {BottomTabProps} from "../../types/navigationTypes";
import {useTranslation} from "react-i18next";

type NavigationProps = BottomTabProps<"Calendar">

const CalendarScreen: FC<NavigationProps> = ({ navigation }) => {

    const { t } = useTranslation();

    return (
        <SafeAreaView>
            <Text>{t("calendar.title")}</Text>
        </SafeAreaView>
    );
};

export default CalendarScreen;