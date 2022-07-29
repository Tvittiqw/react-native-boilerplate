import React, {useEffect, useRef, useState} from 'react'
import {StyleSheet, Animated, Dimensions} from 'react-native'
import { PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler'
import {TimeSchedule} from '../../common'
import moment from 'moment'
import {calendarFormattedDate} from "../../../utils/dateUtils";

const mockEvents = [
    { description: 'Breakfast', dateStart: '2022-07-28', dateEnd: '2022-07-28', timeStart: '08:00', timeEnd: '08:50' },
    { description: 'Call a doctor', dateStart: '2022-07-29', dateEnd: '2022-07-29', timeStart: '10:00', timeEnd: '10:20' },
    { description: 'Call a sister', dateStart: '2022-07-29', dateEnd: '2022-07-29', timeStart: '11:00', timeEnd: '11:30' },
    { description: 'Work', dateStart: '2022-07-30', dateEnd: '2022-07-30', timeStart: '10:00', timeEnd: '13:20' },
    { description: 'Dinner', dateStart: '2022-07-27', dateEnd: '2022-07-27', timeStart: '13:00', timeEnd: '14:10' },
    { description: 'Call all clients', dateStart: '2022-07-26', dateEnd: '2022-07-26', timeStart: '14:00', timeEnd: '17:30' },
    { description: 'Watch serial', dateStart: '2022-07-25', dateEnd: '2022-07-25', timeStart: '19:00', timeEnd: '21:30' },
    { description: 'Watch doc', dateStart: '2022-07-24', dateEnd: '2022-07-24', timeStart: '19:00', timeEnd: '21:30' },
    { description: 'Watch film', dateStart: '2022-07-23', dateEnd: '2022-07-23', timeStart: '19:00', timeEnd: '21:30' },
    { description: 'Go to sea', dateStart: '2022-08-01', dateEnd: '2022-08-01', timeStart: '15:00', timeEnd: '18:30' },
    { description: 'Go to fitness', dateStart: '2022-08-02', dateEnd: '2022-08-02', timeStart: '14:00', timeEnd: '15:30' },
]

const dimensionWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    swipeContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    element: {
        // flex: 1,
        width: '100%',
    }
})

const SwipeableTimeSchedule = (props) => {

    const {
        initialDate,
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

    const [mainIndex, setMainIndex] = useState(0)

    const [period, setPeriod] = useState(() => {
        const date = initialDate || moment()
        return [
            calendarFormattedDate(date),
            calendarFormattedDate(moment(date).add(1, 'day')),
            calendarFormattedDate(moment(date).add(-1, 'day'))
        ]
    })

    const [events, setEvents] = useState({})

    useEffect(() => {
        let newPeriod = []
        switch (mainIndex) {
            case 0: {
                newPeriod = [
                    calendarFormattedDate(initialDate),
                    calendarFormattedDate(moment(initialDate).add(1, 'day')),
                    calendarFormattedDate(moment(initialDate).add(-1, 'day'))
                ]
                break
            }
            case 1: {
                newPeriod = [
                    calendarFormattedDate(moment(initialDate).add(-1, 'day')),
                    calendarFormattedDate(initialDate),
                    calendarFormattedDate(moment(initialDate).add(1, 'day')),
                ]
                break
            }
            case 2: {
                newPeriod = [
                    calendarFormattedDate(moment(initialDate).add(1, 'day')),
                    calendarFormattedDate(moment(initialDate).add(-1, 'day')),
                    calendarFormattedDate(initialDate),
                ]
                break
            }
        }
        setPeriod(newPeriod)
    }, [initialDate, mainIndex])

    useEffect(() => {
        // TODO
        /** Real request for get events */
        const eventsData = mockEvents.filter((ev) => period.some((day) => day === ev.dateStart))
        setEvents((_) => {
            let obj = {}
            period.forEach((propName) =>
                obj = { ...obj, [propName]: eventsData.filter((ev) => ev.dateStart === propName) })
            return obj
        })
    }, [period])

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

            onSwipeLeft && onSwipeLeft()
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

            onSwipeRight && onSwipeRight()
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
        <GestureHandlerRootView style={styles.swipeContainer}>
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
                    <TimeSchedule eventsData={events[period[0]]}/>
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
                    <TimeSchedule eventsData={events[period[1]]}/>
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
                    <TimeSchedule eventsData={events[period[2]]}/>
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    )
}

export default SwipeableTimeSchedule