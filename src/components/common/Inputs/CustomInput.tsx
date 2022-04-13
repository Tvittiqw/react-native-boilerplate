import React, {FC, useRef, useState} from "react";
import {TextInput, TextInputProps, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, Text} from "react-native";

type CustomInputPropsType = {
    passwordInput?: boolean
    error?: string
    inputContainerStyle?: StyleProp<ViewStyle>
};

const CustomInput: FC<TextInputProps & CustomInputPropsType> = (
    {
        passwordInput,
        inputContainerStyle,
        error,
        ...inputProps
    }) => {

    const [hidePassword, setHidePassword] = useState(passwordInput);

    const inputRef = useRef<TextInput | null>(null);

    const focusInput = () => {
        inputRef.current?.focus();
    }

    return (
        <>
            <TouchableOpacity
                onPress={focusInput}
                style={[styles.inputContainer, inputContainerStyle || {}]}
            >
                <TextInput
                    {...inputProps}
                    secureTextEntry={hidePassword}
                    ref={inputRef}
                />
            </TouchableOpacity>
            {error ? (
                <Text>{error}</Text>
            ) : null}
        </>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "gray",
    }
})

export default React.memo(CustomInput);