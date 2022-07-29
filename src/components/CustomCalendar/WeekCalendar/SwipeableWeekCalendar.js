import React, {useEffect, useRef, useState} from 'react'
import {Dimensions, View, Animated, StyleSheet} from 'react-native'
import { PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler'
import WeekCalendar from "./index";
import {getOffsetWeekDay} from "../../../utils/dateUtils";
import {WeekNamesComponent} from "../../common";

const dimensionWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    swipeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    element: {
        flex: 1,
        width: '100%',
    }
})

const SwipeableWeekCalendar = (props) => {

    const {
        startWeekDate,
        selectedDate,
        onPressDay,
        onSwipeLeft,
        onSwipeRight,
    } = props

    let oldTranslateX = 0
    const translateXArray = useRef([
        new Animated.Value(0),
        new Animated.Value(dimensionWidth),
        new Animated.Value(-dimensionWidth)
    ]).current

    const recordTranslateXArray = useRef([0, dimensionWidth, -dimensionWidth]).current

    const [weeksArray, setWeeksArray] = useState(() => [
        startWeekDate,
        getOffsetWeekDay(startWeekDate, 1, true),
        getOffsetWeekDay(startWeekDate, -1, true),
    ])

    const [mainIndex, setMainIndex] = useState(0)

    const [selectedDay, setSelectedDay] = useState(selectedDate || null)

    useEffect(() => {
        setSelectedDay(selectedDate)
        if (!weeksArray.find((el) => el === selectedDate)) {
            switch (mainIndex) {
                case 0: {
                    setWeeksArray([
                        selectedDate,
                        getOffsetWeekDay(selectedDate, 1, true),
                        getOffsetWeekDay(selectedDate, -1, true),
                    ])
                    break
                }
                case 1: {
                    setWeeksArray([
                        getOffsetWeekDay(selectedDate, -1, true),
                        selectedDate,
                        getOffsetWeekDay(selectedDate, 1, true),
                    ])
                    break
                }
                case 2: {
                    setWeeksArray([
                        getOffsetWeekDay(selectedDate, 1, true),
                        getOffsetWeekDay(selectedDate, -1, true),
                        selectedDate,
                    ])
                    break
                }
            }
        }
    }, [selectedDate, weeksArray, mainIndex])

    const pressDayHandle = (date) => {
        setSelectedDay(date)
        onPressDay && onPressDay(date)
    }

    const swipeHandle = (direction, index) => {
        let newWeeksArr = [...weeksArray]

        if (direction === 'right') {
            if (index === 0) {
                newWeeksArr[1] = getOffsetWeekDay(newWeeksArr[2], -1, true)
            } else {
                newWeeksArr[(index + 1) % 3] = getOffsetWeekDay(weeksArray[(index - 1) % 3], -1 , true)
            }
            setWeeksArray([...newWeeksArr])
        }

        if (direction === 'left') {
            if (index === 0) {
                newWeeksArr[2] = getOffsetWeekDay(newWeeksArr[1], 1, true)
            } else {
                newWeeksArr[(index - 1) % 3] = getOffsetWeekDay(weeksArray[(index + 1) % 3], 1, true)
            }
            setWeeksArray([...newWeeksArr])
        }
    }

    const handleAnimation = (index) => {
        if (recordTranslateXArray[index] >= -100 && recordTranslateXArray[index] <= 100) {
            recordTranslateXArray[index] = 0
            recordTranslateXArray[(index + 1) % 3] = dimensionWidth

            if (index - 1 < 0) {
                index = 6
            }

            recordTranslateXArray[(index - 1) % 3] = -dimensionWidth

            let animationArray = translateXArray.map((translate, i) =>
                Animated.spring(translateXArray[i], {
                    toValue: recordTranslateXArray[i],
                    useNativeDriver: false,
                })
            )

            Animated.parallel(
                animationArray,
                {
                    stopTogether: true,
                    useNativeDriver: false,
                }
            ).start()
        }
        // if the translation of the present component is lower than the left limit
        // => we swipe to the left => go to the future calendars.
        else if (recordTranslateXArray[index] < -100) {
            recordTranslateXArray[index] = - dimensionWidth
            recordTranslateXArray[(index + 1) % 3] = 0

            if (index - 1 < 0) {
                index = 6
            }

            recordTranslateXArray[(index - 1) % 3] = dimensionWidth
            translateXArray[(index - 1) % 3].setValue(dimensionWidth)

            // we will do the animations of the rest components (present and right most)
            let animationArray = translateXArray.map((translate, i) => {
                if (i !== (index - 1) % 3)
                    return (
                        Animated.spring(translateXArray[i], {
                            toValue: recordTranslateXArray[i],
                            useNativeDriver: false,
                        })
                    )
            })

            Animated.parallel(
                animationArray,
                {
                    stopTogether: true,
                    useNativeDriver: false,
                }
            ).start()

            swipeHandle('left', mainIndex)
            onSwipeLeft && onSwipeLeft(weeksArray[(index + 1) % 3])
            setMainIndex((index + 1) % 3)
        }
        // this is when we swipe to the right.
        else if (recordTranslateXArray[index] > 100) {

            recordTranslateXArray[index] = dimensionWidth

            recordTranslateXArray[(index + 1) % 3] = -dimensionWidth

            translateXArray[(index + 1) % 3].setValue(-dimensionWidth)

            if (index - 1 < 0) {
                index = 6
            }
            recordTranslateXArray[(index - 1) % 3] = 0

            let animationArray = translateXArray.map((translate, i) => {
                if (i !== (index + 1) % 3)
                    return (
                        Animated.spring(translateXArray[i], {
                            toValue: recordTranslateXArray[i],
                            useNativeDriver: false,
                        })
                    )
            })

            Animated.parallel(
                animationArray,
                {
                    stopTogether: true,
                    useNativeDriver: false,
                }
            ).start()

            swipeHandle('right', mainIndex)
            onSwipeRight && onSwipeRight(weeksArray[(index - 1) % 3])
            setMainIndex((index - 1) % 3)
        }
    }

    const onGestureEvent = Animated.event(
        [{}],
        {
            listener: ({ nativeEvent }) => {
                recordTranslateXArray.forEach((_, index, arr) => {
                    arr[index] += nativeEvent.translationX - oldTranslateX
                })

                translateXArray.forEach((translate, index, arr) => {
                    arr[index].setValue(recordTranslateXArray[index])
                })

                oldTranslateX = nativeEvent.translationX
            },
            useNativeDriver: false,
        }
    )

    const onHandlerStateChange = ({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
            oldTranslateX = 0
            handleAnimation(mainIndex)
        }
    }

    return (
        <GestureHandlerRootView>
            <WeekNamesComponent containerStyle={{ paddingBottom: 0 }}/>
            <View style={styles.swipeContainer}>
                <PanGestureHandler
                    onGestureEvent={onGestureEvent}
                    onHandlerStateChange={onHandlerStateChange}
                >
                    <Animated.View
                        style={[
                            styles.element,
                            { transform: [{ translateX: translateXArray[0] }] },
                        ]}
                    >
                        <WeekCalendar
                            initialDate={weeksArray[0]}
                            selectedDate={selectedDay}
                            onPressDay={pressDayHandle}
                            withoutWeekNames
                        />
                    </Animated.View>
                </PanGestureHandler>

                <PanGestureHandler
                    onGestureEvent={onGestureEvent}
                    onHandlerStateChange={onHandlerStateChange}
                >
                    <Animated.View
                        style={[
                            styles.element,
                            {
                                transform: [{ translateX: translateXArray[1] }],
                                position: "absolute",
                                top: 0,
                                bottom: 0,
                            },
                        ]}
                    >
                        <WeekCalendar
                            initialDate={weeksArray[1]}
                            selectedDate={selectedDay}
                            onPressDay={pressDayHandle}
                            withoutWeekNames
                        />
                    </Animated.View>
                </PanGestureHandler>

                <PanGestureHandler
                    onGestureEvent={onGestureEvent}
                    onHandlerStateChange={onHandlerStateChange}
                >
                    <Animated.View
                        style={[
                            styles.element,
                            {
                                transform: [{ translateX: translateXArray[2] }],
                                position: "absolute",
                                top: 0,
                                bottom: 0,
                            },
                        ]}
                    >
                        <WeekCalendar
                            initialDate={weeksArray[2]}
                            selectedDate={selectedDay}
                            onPressDay={pressDayHandle}
                            withoutWeekNames
                        />
                    </Animated.View>
                </PanGestureHandler>
            </View>
        </GestureHandlerRootView>
    )
}

export default SwipeableWeekCalendar