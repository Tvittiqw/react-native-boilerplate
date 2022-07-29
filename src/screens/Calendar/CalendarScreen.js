import React, {useLayoutEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import Calendar from "../../components/CustomCalendar/Calendar";
import CalendarList from "../../components/CustomCalendar/CalendarList";
import {COLORS} from "../../constants/global";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: COLORS.WHITE
    }
})

const CalendarScreen = ({navigation}) => {

  const {t} = useTranslation()

  const onDayPressHandle = (day) => {
      if (day) {
          navigation.navigate('ScheduleScreen', {
              selectedDay: day
          })
      }
  }

  useLayoutEffect(() => {
      navigation.setOptions({ title: t('calendar.title') })
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
            {/*<Calendar*/}
            {/*    onPressDay={(day) => setSelectedDay(day)}*/}
            {/*    hideExtraDays={true}*/}
            {/*/>*/}
            <CalendarList
                onSelectedDay={onDayPressHandle}
            />
        </View>
    </SafeAreaView>
  );
};

export default CalendarScreen
