import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const RoundButton = ({
  onPress,
  text = 'Button',
  disabled = false,
  loading = false,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress} disabled={disabled}>
      <View style={[styles.button, !disabled && styles.buttonActive]}>
        {!loading ? (
          <Text style={[styles.buttonText]}>{text}</Text>
        ) : (
          <ActivityIndicator color="white" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    overflow: 'hidden',
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  buttonActive: {
    backgroundColor: 'blue',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default RoundButton;
