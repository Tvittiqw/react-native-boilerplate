import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

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
  weekDayText: {
    color: 'gray',
  },
});

const WeekNamesComponent = props => {
  const {containerStyle, dayStyle, dayTextStyle} = props;

  const {t} = useTranslation();

  return (
    <View style={[styles.week, containerStyle]}>
      {t('calendar.shortWeekDays', {returnObjects: true}).map(weekDay => (
        <View key={weekDay} style={[styles.dayContainer, dayStyle]}>
          <Text style={[styles.weekDayText, dayTextStyle]}>{weekDay}</Text>
        </View>
      ))}
    </View>
  );
};

export default WeekNamesComponent;
