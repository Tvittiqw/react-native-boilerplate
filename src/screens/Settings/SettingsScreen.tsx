import React, {FC} from 'react';
import {SafeAreaView, Text} from "react-native";
import {BottomTabProps} from "../../types/navigationTypes";

type NavigationProps = BottomTabProps<"Settings">

const SettingsScreen: FC<NavigationProps> = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Text>Settings Screen</Text>
        </SafeAreaView>
    );
};

export default SettingsScreen;