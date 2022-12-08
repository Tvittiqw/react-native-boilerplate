import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import WeekCalendar from './index';
import {getOffsetWeekDay} from '../../../utils/dateUtils';
import {SwipeGestureContainer, WeekNamesComponent} from '../../common';

const SwipeableWeekCalendar = props => {
  const {startWeekDate, selectedDate, onPressDay, onSwipeLeft, onSwipeRight} =
    props;

  const [weeksArray, setWeeksArray] = useState(() => [
    startWeekDate,
    getOffsetWeekDay(startWeekDate, 1, true),
    getOffsetWeekDay(startWeekDate, -1, true),
  ]);

  const [selectedDay, setSelectedDay] = useState(selectedDate || null);
  const [mainIndex, setMainIndex] = useState(0);

  useEffect(() => {
    setSelectedDay(selectedDate);
    if (!weeksArray.find(el => el === selectedDate)) {
      switch (mainIndex) {
        case 0: {
          setWeeksArray([
            selectedDate,
            getOffsetWeekDay(selectedDate, 1, true),
            getOffsetWeekDay(selectedDate, -1, true),
          ]);
          break;
        }
        case 1: {
          setWeeksArray([
            getOffsetWeekDay(selectedDate, -1, true),
            selectedDate,
            getOffsetWeekDay(selectedDate, 1, true),
          ]);
          break;
        }
        case 2: {
          setWeeksArray([
            getOffsetWeekDay(selectedDate, 1, true),
            getOffsetWeekDay(selectedDate, -1, true),
            selectedDate,
          ]);
          break;
        }
      }
    }
  }, [mainIndex, selectedDate]);

  const pressDayHandle = date => {
    setSelectedDay(date);
    onPressDay && onPressDay(date);
  };

  const swipeHandle = (direction, index) => {
    let newWeeksArr = [...weeksArray];

    let activeIndex = index;
    if (activeIndex - 1 < 0) {
      activeIndex = 6;
    }

    if (direction === 'right') {
      if (index === 0) {
        newWeeksArr[1] = getOffsetWeekDay(newWeeksArr[2], -1, true);
      } else {
        newWeeksArr[(index + 1) % 3] = getOffsetWeekDay(
          weeksArray[(index - 1) % 3],
          -1,
          true,
        );
      }
      onSwipeRight(weeksArray[(activeIndex - 1) % 3]);
      setWeeksArray([...newWeeksArr]);
    }

    if (direction === 'left') {
      if (index === 0) {
        newWeeksArr[2] = getOffsetWeekDay(newWeeksArr[1], 1, true);
      } else {
        newWeeksArr[(index - 1) % 3] = getOffsetWeekDay(
          weeksArray[(index + 1) % 3],
          1,
          true,
        );
      }
      onSwipeLeft(weeksArray[(activeIndex + 1) % 3]);
      setWeeksArray([...newWeeksArr]);
    }
  };

  return (
    <View>
      <WeekNamesComponent containerStyle={{paddingBottom: 0}} />
      <SwipeGestureContainer
        centerContent={
          <WeekCalendar
            initialDate={weeksArray[0]}
            selectedDate={selectedDay}
            onPressDay={pressDayHandle}
            withoutWeekNames
          />
        }
        rightContent={
          <WeekCalendar
            initialDate={weeksArray[1]}
            selectedDate={selectedDay}
            onPressDay={pressDayHandle}
            withoutWeekNames
          />
        }
        leftContent={
          <WeekCalendar
            initialDate={weeksArray[2]}
            selectedDate={selectedDay}
            onPressDay={pressDayHandle}
            withoutWeekNames
          />
        }
        onSwipeLeft={activeIndex => {
          swipeHandle('left', activeIndex);
        }}
        onSwipeRight={activeIndex => {
          swipeHandle('right', activeIndex);
        }}
        onIndexChange={index => setMainIndex(index)}
      />
    </View>
  );
};

export default SwipeableWeekCalendar;
