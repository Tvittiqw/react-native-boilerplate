import React, {FC, useEffect, useState} from "react";
import {NavigationContainer, DefaultTheme, DarkTheme, Theme} from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ForgotPasswordScreen, LoginScreen, ResetPasswordScreen, SignUpScreen} from "../screens";
import {useTypedSelector} from "../hooks/storeHooks/typedStoreHooks";
import {RootStackParamList} from "../types/navigationTypes";
import BottomTabNavigator from "./BottomTabNavigator";
import BackgroundTimer from 'react-native-background-timer';
import {getCurrentTimeMode} from "../utils/getCurrentTimeMode";

const Stack = createNativeStackNavigator<RootStackParamList>();

type AppThemeType = "light" | "dark";

const MyLightTheme: Theme = {
    ...DefaultTheme
}

const MyDarkTheme: Theme = {
    dark: true,
    colors: {
        ...DarkTheme.colors,
        // background: "gray",
    }
}

const StackNavigator: FC = () => {

    const [isDynamicallyThemeChange, setDynamicallyThemeChange] = useState(true);
    const [appTheme, setAppTheme] = useState<AppThemeType>("light");

    const { isAuth } = useTypedSelector((state) => state.auth);

    useEffect(() => {
        if (isDynamicallyThemeChange) {
            const intervalId = BackgroundTimer.setInterval(() => {
                const currentTimeMode = getCurrentTimeMode();
                if (currentTimeMode === "morning") {
                    setAppTheme("light");
                } else {
                    setAppTheme("dark");
                }
            }, 1000);
            return () => {
                BackgroundTimer.clearInterval(intervalId);
            }
        }
    }, [isDynamicallyThemeChange])

    return (
        <NavigationContainer theme={appTheme === "dark" ? MyDarkTheme : MyLightTheme}>
            <Stack.Navigator>
                {isAuth ? (
                    <>
                        <Stack.Screen
                            name={"BottomTab"}
                            component={BottomTabNavigator}
                            options={{ headerShown: false }}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name={"Login"}
                            component={LoginScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name={"SignUp"}
                            component={SignUpScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name={"ForgotPassword"}
                            component={ForgotPasswordScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                )}

                <Stack.Group navigationKey={isAuth ? "user" : "guest"}>
                    <Stack.Screen
                        name={"ResetPassword"}
                        component={ResetPasswordScreen}
                        options={{ headerShown: false }}
                    />
                </Stack.Group>

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator;