import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SearchScreen, SettingsScreen, ScheduleScreen} from '../../screens';
// import CalendarStack from './CalendarStack';
// calendar is not needed for now

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={'Schedule'}
        component={ScheduleScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require('../../assets/icons/calendar.png')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'Search'}
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require('../../assets/icons/search.png')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'Settings'}
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require('../../assets/icons/settings-sliders.png')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
