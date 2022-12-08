import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, StyleSheet} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';

const dimensionWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  swipeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  element: {
    width: '100%',
  },
});

const SwipeGestureContainer = props => {
  const {
    leftContent,
    centerContent,
    rightContent,
    rootViewContainerStyle = {},
    onSwipeLeft,
    onSwipeRight,
    onIndexChange,
  } = props;

  let oldTranslateX = 0;
  const translateXArray = useRef([
    new Animated.Value(0),
    new Animated.Value(dimensionWidth),
    new Animated.Value(-dimensionWidth),
  ]).current;

  const recordTranslateXArray = useRef([
    0,
    dimensionWidth,
    -dimensionWidth,
  ]).current;

  const opacityArray = useRef([
    new Animated.Value(1),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const [mainIndex, setMainIndex] = useState(0);

  useEffect(() => {
    onIndexChange && onIndexChange(mainIndex);
  }, [mainIndex, onIndexChange]);

  const handleAnimation = index => {
    if (
      recordTranslateXArray[index] >= -100 &&
      recordTranslateXArray[index] <= 100
    ) {
      recordTranslateXArray[index] = 0;
      recordTranslateXArray[(index + 1) % 3] = dimensionWidth;

      if (index - 1 < 0) {
        index = 6;
      }

      recordTranslateXArray[(index - 1) % 3] = -dimensionWidth;
      setTimeout(() => {
        opacityArray[(index - 1) % 3].setValue(0);
        opacityArray[(index + 1) % 3].setValue(0);
      }, 100);

      let animationArray = translateXArray.map((translate, i) =>
        Animated.spring(translateXArray[i], {
          toValue: recordTranslateXArray[i],
          useNativeDriver: false,
        }),
      );

      Animated.parallel(animationArray, {
        stopTogether: true,
        useNativeDriver: false,
      }).start();
    }
    // if the translation of the present component is lower than the left limit
    // => we swipe to the left => go to the future calendars.
    else if (recordTranslateXArray[index] < -100) {
      recordTranslateXArray[index] = -dimensionWidth;
      recordTranslateXArray[(index + 1) % 3] = 0;

      if (index - 1 < 0) {
        index = 6;
      }

      recordTranslateXArray[(index - 1) % 3] = dimensionWidth;
      translateXArray[(index - 1) % 3].setValue(dimensionWidth);
      opacityChangeWithDebounce(index, 0);

      // we will do the animations of the rest components (present and right most)
      let animationArray = translateXArray.map((translate, i) => {
        if (i !== (index - 1) % 3) {
          return Animated.spring(translateXArray[i], {
            toValue: recordTranslateXArray[i],
            useNativeDriver: false,
          });
        }
      });

      Animated.parallel(animationArray, {
        stopTogether: true,
        useNativeDriver: false,
      }).start();
      onSwipeLeft && onSwipeLeft(index % 3);
      setMainIndex((index + 1) % 3);
    }
    // this is when we swipe to the right.
    else if (recordTranslateXArray[index] > 100) {
      recordTranslateXArray[index] = dimensionWidth;

      recordTranslateXArray[(index + 1) % 3] = -dimensionWidth;

      translateXArray[(index + 1) % 3].setValue(-dimensionWidth);

      if (index - 1 < 0) {
        index = 6;
      }
      recordTranslateXArray[(index - 1) % 3] = 0;
      opacityChangeWithDebounce(index, 0);

      let animationArray = translateXArray.map((translate, i) => {
        if (i !== (index + 1) % 3) {
          return Animated.spring(translateXArray[i], {
            toValue: recordTranslateXArray[i],
            useNativeDriver: false,
          });
        }
      });

      Animated.parallel(animationArray, {
        stopTogether: true,
        useNativeDriver: false,
      }).start();
      onSwipeRight && onSwipeRight(index % 3);
      setMainIndex((index - 1) % 3);
    }
  };

  const changeOpacity = () => {
    let index = mainIndex;
    if (index - 1 < 0) {
      index = 6;
    }
    if (recordTranslateXArray[mainIndex] > 25) {
      opacityArray[(index - 1) % 3].setValue(1);
    }
    if (recordTranslateXArray[mainIndex] < -25) {
      opacityArray[(index + 1) % 3].setValue(1);
    }
  };

  const opacityChangeWithDebounce = (index, value) => {
    setTimeout(() => {
      opacityArray[index % 3].setValue(value);
    }, 100);
  };

  const onGestureEvent = Animated.event([{}], {
    listener: ({nativeEvent}) => {
      recordTranslateXArray.forEach((_, index, arr) => {
        arr[index] += nativeEvent.translationX - oldTranslateX;
      });

      translateXArray.forEach((translate, index, arr) => {
        arr[index].setValue(recordTranslateXArray[index]);
      });
      changeOpacity();
      oldTranslateX = nativeEvent.translationX;
    },
    useNativeDriver: false,
  });

  const onHandlerStateChange = ({nativeEvent}) => {
    if (nativeEvent.state === State.END) {
      oldTranslateX = 0;
      handleAnimation(mainIndex);
    }
  };

  return (
    <GestureHandlerRootView
      style={[styles.swipeContainer, rootViewContainerStyle]}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View
          style={[
            styles.element,
            {
              transform: [{translateX: translateXArray[0]}],
              opacity: opacityArray[0],
            },
          ]}>
          {centerContent}
        </Animated.View>
      </PanGestureHandler>

      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View
          style={[
            styles.element,
            {
              transform: [{translateX: translateXArray[1]}],
              opacity: opacityArray[1],
              position: 'absolute',
              top: 0,
              bottom: 0,
            },
          ]}>
          {rightContent}
        </Animated.View>
      </PanGestureHandler>

      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View
          style={[
            styles.element,
            {
              transform: [{translateX: translateXArray[2]}],
              opacity: opacityArray[2],
              position: 'absolute',
              top: 0,
              bottom: 0,
            },
          ]}>
          {leftContent}
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default SwipeGestureContainer;
