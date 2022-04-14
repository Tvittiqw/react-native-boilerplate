import React, {FC} from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {BottomTabParamList} from "../types/navigationTypes";
import {CalendarScreen, HomeScreen} from "../screens";

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: FC = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name={"Home"}
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name={"Calendar"}
                component={CalendarScreen}
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;