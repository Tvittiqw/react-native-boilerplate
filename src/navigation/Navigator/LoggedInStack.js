import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';

const LoggedInNavigator = createNativeStackNavigator();

const LoggedInStack = () => {
    const {Navigator, Screen} = LoggedInNavigator;
    return (
        <Navigator>
            <Screen
                name={'BottomTab'}
                component={BottomTabNavigator}
                options={{headerShown: false}}
            />
        </Navigator>
    )
}

export default LoggedInStack;

