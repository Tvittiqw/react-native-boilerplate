import React, {FC} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ForgotPasswordScreen, LoginScreen, ResetPasswordScreen, SignUpScreen} from "../screens";
import {useTypedSelector} from "../hooks/storeHooks/typedStoreHooks";
import {RootStackParamList} from "../types/navigationTypes";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator: FC = () => {

    const { isAuth } = useTypedSelector((state) => state.auth)

    return (
        <NavigationContainer>
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