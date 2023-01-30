import React, {useRef, useState} from 'react';
import {TextInput, TouchableOpacity, StyleSheet, Text} from 'react-native';

const CustomInput = ({
  passwordInput,
  inputContainerStyle,
  error,
  ...inputProps
}) => {
  const [hidePassword] = useState(passwordInput);

  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <TextInput
        style={[inputContainerStyle, styles.inputContainer]}
        {...inputProps}
        secureTextEntry={hidePassword}
        ref={inputRef}
      />
      {error ? <Text>{error}</Text> : null}
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default React.memo(CustomInput);
