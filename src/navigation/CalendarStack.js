import React from 'react';
import {CalendarScreen, ScheduleScreen} from '../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Header} from '../components/common';

const Stack = createNativeStackNavigator();

const CalendarStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: props => <Header {...props} title={'test'} />,
      }}>
      <Stack.Screen name={'Calendar'} component={CalendarScreen} />
      <Stack.Screen name={'Schedule'} component={ScheduleScreen} />
    </Stack.Navigator>
  );
};

export default CalendarStackNavigator;
