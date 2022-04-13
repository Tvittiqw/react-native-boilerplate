import React, {FC} from "react";
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {routes} from "../consants/routes";
import {HomeScreen, LoginScreen, SignUpScreen} from "../screens";
import {useTypedSelector} from "../hooks/storeHooks/typedStoreHooks";
import {RootStackParamList} from "../types/navigationTypes";

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator: FC = () => {

    const { isAuth } = useTypedSelector((state) => state.auth)

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isAuth ? (
                    <>
                        <Stack.Screen
                            name={routes.private.home}
                            component={HomeScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name={routes.public.login}
                            component={LoginScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name={routes.public.signup}
                            component={SignUpScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator;