import React, {FC, useEffect, useState} from 'react';
import LottieView from 'lottie-react-native';
import {StyleSheet, View} from "react-native";

type Props = {
    setInitApp: (value: boolean) => void
}

const SplashScreen: FC<Props> = ({ setInitApp }) => {

    const [isAuthInit, setAuthInit] = useState(false);
    const [splashAnimationFinish, setSplashAnimationFinish] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setAuthInit(true)
        }, 5000);
    }, []);

    useEffect(() => {
        if (isAuthInit && splashAnimationFinish) {
            setInitApp(true);
        }
    }, [isAuthInit, splashAnimationFinish])

    return (
        <View style={styles.wrap}>
            <LottieView
                source={require("../../assets/splash/splash-screen.json")}
                autoPlay
                loop={false}
                resizeMode="cover"
                onAnimationFinish={() => setSplashAnimationFinish(true)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default SplashScreen;