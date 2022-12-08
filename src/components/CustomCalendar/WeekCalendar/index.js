import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import moment from 'moment';
import {
  calendarFormattedDate,
  isToday,
  sameDay,
  sameWeekDays,
  weekPage,
} from '../../../utils/dateUtils';
import Day from '../Calendar/day';
import {WeekNamesComponent} from '../../common';

const styles = StyleSheet.create({
  dayContainer: {
    flex: 1,
    alignItems: 'center',
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
});

const WeekCalendar = props => {
  const {
    initialDate,
    selectedDate,
    onPressDay,
    withoutWeekNames = false,
  } = props;

  const [selectedDay, setSelectedDay] = useState(
    selectedDate ? moment(selectedDate) : null,
  );

  useEffect(() => {
    setSelectedDay(selectedDate);
  }, [selectedDate]);

  const currentWeekData = useMemo(() => {
    if (initialDate) {
      const date = initialDate || moment();
      return weekPage(date);
    }
  }, [initialDate]);

  const dayPressHandle = date => {
    setSelectedDay(date);
    onPressDay && onPressDay(date);
  };

  const renderWeek = useCallback(() => {
    return currentWeekData.map((day, index) => {
      let todayStatus;
      if (isToday(day)) {
        if (!selectedDay) {
          todayStatus = 'today';
        } else {
          todayStatus = 'today-no-active';
        }
      } else {
        todayStatus = 'not-today';
      }
      return (
        <View key={index} style={styles.dayContainer}>
          <Day
            date={calendarFormattedDate(day)}
            isSelected={sameDay(selectedDay, day)}
            todayState={todayStatus}
            onPressDay={dayPressHandle}
          />
        </View>
      );
    });
  }, [currentWeekData, selectedDay]);

  return (
    <View>
      {!withoutWeekNames && (
        <WeekNamesComponent containerStyle={{paddingBottom: 0}} />
      )}
      <View style={styles.week}>{renderWeek()}</View>
    </View>
  );
};

export default WeekCalendar;
