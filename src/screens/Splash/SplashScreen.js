import React from 'react';
import LottieView from 'lottie-react-native';
import {StyleSheet, View} from 'react-native';

const SplashScreen = ({setSplashAnimationFinish}) => {
  return (
    <View style={styles.wrap}>
      <LottieView
        source={require('../../assets/splash/splash-screen.json')}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
