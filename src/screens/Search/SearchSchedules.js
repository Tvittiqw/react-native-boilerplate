import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {SchedulesList} from '../../containers';
import styles from './styles';

const SearchSchedules = ({type, navigation}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.listContainer}>
      <SchedulesList translate={t} navigation={navigation} type={type} />
    </View>
  );
};

export default SearchSchedules;
