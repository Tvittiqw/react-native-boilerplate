import React from 'react';
import {CalendarScreen, ScheduleScreen} from '../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const CalendarStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Calendar'} component={CalendarScreen} />
      <Stack.Screen name={'Schedule'} component={ScheduleScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export default CalendarStackNavigator;
