import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type HeaderProps = {
  title?: string;
  goBack?: boolean;
  onPress?: () => void;
};

const Header: FC<HeaderProps> = ({title = '', goBack, onPress}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {goBack && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            onPress ? onPress() : navigation.goBack();
          }}>
          <Text style={styles.navLink}>Go back</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  navLink: {
    color: 'blue',
  },
  title: {},
});

export default Header;
