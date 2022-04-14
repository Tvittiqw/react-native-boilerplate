import React, {FC} from 'react';
import {SafeAreaView, Text} from "react-native";
import {BottomTabProps} from "../../types/navigationTypes";

type NavigationProps = BottomTabProps<"Calendar">

const CalendarScreen: FC<NavigationProps> = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Text>Calendar Screen</Text>
        </SafeAreaView>
    );
};

export default CalendarScreen;