import React, {FC} from 'react';
import {SafeAreaView, Text} from "react-native";
import {BottomTabProps} from "../../types/navigationTypes";

type NavigationProps = BottomTabProps<"Home">

const HomeScreen: FC<NavigationProps> = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Text>Home Screen</Text>
        </SafeAreaView>
    );
};

export default HomeScreen;