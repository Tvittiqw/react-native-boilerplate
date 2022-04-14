import React, {FC} from 'react';
import {SafeAreaView, Text} from "react-native";
import {BottomTabProps} from "../../types/navigationTypes";

type NavigationProps = BottomTabProps<"Search">

const SearchScreen: FC<NavigationProps> = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Text>Search Screen</Text>
        </SafeAreaView>
    );
};

export default SearchScreen;