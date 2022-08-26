import React from 'react';
import {CalendarScreen, ScheduleScreen} from '../../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const CalendarNavigator = createNativeStackNavigator();

const CalendarStack = () => {
  const {Navigator, Screen} = CalendarNavigator;
  return (
    <Navigator>
      <Screen name={'Calendar'} component={CalendarScreen} />
      <Screen name={'Schedule'} component={ScheduleScreen} options={{headerShown: false}} />
    </Navigator>
  );
};

export default CalendarStack;
