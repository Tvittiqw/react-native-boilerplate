import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

const SearchScreen = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <SafeAreaView>
      <Text>{t('search.title')}</Text>
    </SafeAreaView>
  );
};

export default SearchScreen;
