import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {dateToData} from '../../../../utils/dateUtils';
import {COLORS} from '../../../../constants/global';
const styles = StyleSheet.create({
  containerDefault: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDefault: {
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    fontWeight: '600',
  },
  selectedContainer: {
    borderRadius: 16,
    backgroundColor: COLORS.BLACK,
  },
  selectedText: {
    fontSize: 16,
    color: 'white',
  },
  todayContainer: {
    borderRadius: 16,
    backgroundColor: COLORS.RED,
  },
  todayText: {
    fontSize: 16,
    color: COLORS.WHITE,
  },
  todayNoActive: {
    color: COLORS.BLUE,
  },
});

const Day = React.memo(props => {
  const {activeOpacity, date, onPressDay, isSelected, todayState} = props;
  const dateData = date ? dateToData(date) : undefined;

  const onPress = useCallback(() => {
    onPressDay && onPressDay(dateData.dateString);
  }, [onPressDay, dateData]);

  const getStyle = () => {
    const {customStyles} = props;
    const containerStyles = [styles.containerDefault];
    const textStyles = [styles.textDefault];

    if (isSelected) {
      containerStyles.push(styles.selectedContainer);
      textStyles.push(styles.selectedText);
    } else if (todayState === 'today') {
      containerStyles.push(styles.todayContainer);
      textStyles.push(styles.todayText);
    } else if (todayState === 'today-no-active') {
      textStyles.push(styles.todayNoActive);
    }
    if (customStyles) {
      customStyles.container && containerStyles.push(customStyles.container);
      customStyles.text && textStyles.push(customStyles.text);
    }
    return {
      containerStyles,
      textStyles,
    };
  };

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      style={getStyle().containerStyles}
      onPress={onPress}>
      <Text style={getStyle().textStyles}>{dateData.day}</Text>
    </TouchableOpacity>
  );
});

export default Day;
