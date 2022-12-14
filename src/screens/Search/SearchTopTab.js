import React from 'react';
import {SafeAreaView} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SearchSchedules from './SearchSchedules';
import withTypeForSchedules from './withTypeForSchedules';

const Tab = createMaterialTopTabNavigator();
const style = {flex: 1};

const schedulesScreens = {
  My: withTypeForSchedules(SearchSchedules, 'my'),
  Other: withTypeForSchedules(SearchSchedules, 'other'),
};

const SearchTopTab = () => {
  return (
    <SafeAreaView style={style}>
      <Tab.Navigator>
        <Tab.Screen name="My Schedules" component={schedulesScreens.My} />
        <Tab.Screen name="Other Schedules" component={schedulesScreens.Other} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default SearchTopTab;
