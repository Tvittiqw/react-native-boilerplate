import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

const CalendarScreen = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <SafeAreaView>
      <Text>{t('calendar.title')}</Text>
    </SafeAreaView>
  );
};

export default CalendarScreen;
