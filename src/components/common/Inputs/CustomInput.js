import React, {useRef, useState} from 'react';
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

const CustomInput = ({
  passwordInput,
  inputContainerStyle,
  error,
  ...inputProps
}) => {
  const [hidePassword, setHidePassword] = useState(passwordInput);

  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <TouchableOpacity
        onPress={focusInput}
        style={[styles.inputContainer, inputContainerStyle || {}]}>
        <TextInput
          {...inputProps}
          secureTextEntry={hidePassword}
          ref={inputRef}
        />
      </TouchableOpacity>
      {error ? <Text>{error}</Text> : null}
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default React.memo(CustomInput);
