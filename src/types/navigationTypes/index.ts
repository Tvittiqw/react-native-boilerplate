import {NativeStackScreenProps} from "@react-navigation/native-stack";

export type RootStackParamList = {
    Home: undefined
    Login: undefined
    SignUp: undefined
};

export type NavigationPropsType<T extends keyof RootStackParamList>
    = NativeStackScreenProps<RootStackParamList, T>