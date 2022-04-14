import {NativeStackScreenProps} from "@react-navigation/native-stack";
import type {
    CompositeScreenProps,
    NavigatorScreenParams,
} from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';


export type RootStackParamList = {
    BottomTab: NavigatorScreenParams<BottomTabParamList>
    Login: undefined
    SignUp: undefined
};

export type NavigationPropsType<T extends keyof RootStackParamList>
    = NativeStackScreenProps<RootStackParamList, T>

export type BottomTabParamList = {
    Home: undefined;
    Calendar: undefined;
};

export type BottomTabProps<T extends keyof BottomTabParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<BottomTabParamList, T>,
        NavigationPropsType<keyof RootStackParamList>
        >

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

