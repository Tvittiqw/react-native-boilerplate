import React, {FC} from "react";
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {routes} from "../consants/routes";
import {Home, Login, SignUp} from "../screens";

const Stack = createNativeStackNavigator();

const StackNavigator: FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name={routes.private.home}
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={routes.public.login}
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={routes.public.signup}
                    component={SignUp}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator;