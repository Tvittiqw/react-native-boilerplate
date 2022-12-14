import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';

const ScheduleItem = ({name, description, onItemPress}) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onItemPress} activeOpacity={0.9}>
      <Text>{name}</Text>
      <Text>{description}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(ScheduleItem);
