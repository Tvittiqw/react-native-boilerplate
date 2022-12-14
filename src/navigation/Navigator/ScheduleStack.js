import React from 'react';
import {ScheduleScreen, InitCreateScheduleScreen} from '../../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const CalendarNavigator = createNativeStackNavigator();

const ScheduleStack = () => {
  const {Navigator, Screen} = CalendarNavigator;
  return (
    <Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="CreateSchedule">
      <Screen name={'CreateSchedule'} component={InitCreateScheduleScreen} />
      <Screen name={'Schedule'} component={ScheduleScreen} />
    </Navigator>
  );
};

export default ScheduleStack;
