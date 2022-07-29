import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CalendarScreen, SearchScreen, SettingsScreen} from '../screens';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={'Calendar'}
        component={CalendarScreen}
        // options={{headerShown: false}}
      />
      <Tab.Screen
        name={'Search'}
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={'Settings'}
        component={SettingsScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
