import React, {useMemo, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {SwipeableTimeSchedule} from '../../components/common';
import SwipeableWeekCalendar from '../../components/CustomCalendar/WeekCalendar/SwipeableWeekCalendar';
import {COLORS} from '../../constants/global';
import {calendarFormattedDate} from '../../utils/dateUtils';

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    borderBottomWidth: 0.2,
    borderBottomColor: 'gray',
    paddingBottom: 3,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  goBackText: {
    color: COLORS.BLUE,
  },
});

const Header = props => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={props.onGoBackHandle}
        style={styles.headerTopRow}>
        <Text style={styles.goBackText}>{props.text}</Text>
      </TouchableOpacity>
      {props.children}
    </View>
  );
};

const ScheduleScreen = ({navigation, route}) => {
  const [selectedDay, setSelectedDay] = useState(
    route.params?.selectedDay || moment(),
  );

  const {i18n} = useTranslation();

  const headerMonthText = useMemo(() => {
    return moment(selectedDay).format('MMMM,yy');
  }, [selectedDay, i18n.language]);

  const calendarSwipeHandle = newCurrentWeekDate => {
    setSelectedDay(newCurrentWeekDate);
  };

  const scheduleSwipeLeftHandle = () => {
    setSelectedDay(prev => calendarFormattedDate(moment(prev).add(1, 'day')));
  };

  const scheduleSwipeRightHandle = () => {
    setSelectedDay(prev => calendarFormattedDate(moment(prev).add(-1, 'day')));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header text={headerMonthText} onGoBackHandle={() => navigation.goBack()}>
        <SwipeableWeekCalendar
          startWeekDate={selectedDay}
          selectedDate={selectedDay}
          onPressDay={date => setSelectedDay(date)}
          onSwipeLeft={calendarSwipeHandle}
          onSwipeRight={calendarSwipeHandle}
        />
      </Header>
      <View style={{flex: 1, paddingLeft: 20}}>
        <SwipeableTimeSchedule
          initialDate={selectedDay}
          onSwipeLeft={scheduleSwipeLeftHandle}
          onSwipeRight={scheduleSwipeRightHandle}
        />
      </View>
    </SafeAreaView>
  );
};

export default ScheduleScreen;
