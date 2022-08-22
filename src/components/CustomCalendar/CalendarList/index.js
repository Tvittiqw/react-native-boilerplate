import React, {useMemo, useRef, useEffect, useState, useCallback} from 'react'
import {FlatList, View, StyleSheet} from 'react-native'
import moment from 'moment'
import CalendarListItem from "./Item";
// import {FlatList as InfiniteFlatList} from 'react-native-bidirectional-infinite-scroll'
// import {FlatList as InfiniteFlatList} from '@stream-io/flat-list-mvcp'



const PAST_SCROLL_RANGE = 30
const FUTURE_SCROLL_RANGE = 30
const CALENDAR_HEIGHT = 360

const styles = StyleSheet.create({
    flatListContainer: {
        flex: 1
    }
})

const CalendarList = (props) => {

    const {
        current,
        pastScrollRange,
        futureScrollRange,
        showScrollIndicator,
        horizontal,
        calendarHeight = CALENDAR_HEIGHT,
        onSelectedDay,
    } = props

    const date = current ? moment(current) : moment()

    const listRef = useRef()

    const [calendarsData, todayIndex] = useMemo(() => {
        const rows = []
        for (let i = 0; i <= pastScrollRange; i++) {
            rows.push(date.clone().add(i - pastScrollRange, 'month'))
        }
        const todayIndex = rows.length - 1
        for (let i = 1; i <= futureScrollRange; i++) {
            rows.push(date.clone().add(i, 'month'))
        }
        return [rows, todayIndex]
    }, [pastScrollRange, futureScrollRange])

    const renderItem = useCallback(({ item }) => {
        return (
            <View>
                <CalendarListItem
                    item={item}
                    calendarHeight={calendarHeight}
                    onPressDay={(day) => {
                        onSelectedDay && onSelectedDay(day)
                    }}
                />
            </View>
        )
    }, [calendarHeight])

    const getItemLayout = (data, index) => {
        return {
            length: calendarHeight,
            offset: calendarHeight * index,
            index
        }
    }

    return (
        <View style={styles.flatListContainer}>
            <FlatList
                ref={listRef}
                initialListSize={pastScrollRange + futureScrollRange + 1}
                data={calendarsData}
                renderItem={renderItem}
                initialScrollIndex={todayIndex}
                getItemLayout={getItemLayout}
                keyExtractor={props.keyExtractor}
                showsVerticalScrollIndicator={showScrollIndicator}
                showsHorizontalScrollIndicator={horizontal && showScrollIndicator}
            />
        </View>
    )
}

export default CalendarList

CalendarList.defaultProps = {
    pastScrollRange: PAST_SCROLL_RANGE,
    futureScrollRange: FUTURE_SCROLL_RANGE,
    horizontal: false,
    scrollEnabled: true,
    keyExtractor: (item) => item.toString(),
    showScrollIndicator: false,
}

// TODO
/* Calendar infinite scroll */

// const InfiniteCalendarList = (props) => {
//
//     const {
//         current,
//         showScrollIndicator,
//         horizontal,
//         calendarHeight = CALENDAR_HEIGHT,
//     } = props
//
//     let initTodayIndex = null
//     const listRef = useRef()
//
//     const [calendarsData, setCalendarsData] = useState(() => {
//         const rows = []
//         const date = current ? moment(current) : moment()
//         for (let i = 0; i <= PAST_SCROLL_RANGE; i++) {
//             rows.push(date.clone().add(i - PAST_SCROLL_RANGE, 'month'))
//         }
//         initTodayIndex = rows.length - 1
//         for (let i = 1; i <= FUTURE_SCROLL_RANGE; i++) {
//             rows.push(date.clone().add(i, 'month'))
//         }
//         return rows
//     })
//
//     const [todayDayIndex, setTodayDayIndex] = useState(initTodayIndex)
//
//     const getItemLayout = (data, index) => {
//         return {
//             length: calendarHeight,
//             offset: calendarHeight * index,
//             index
//         };
//     }
//
//     const loadMoreOlderMonths = () => {
//         const olderRows = []
//         if (calendarsData.length) {
//             for (let i = 0; i < PAST_SCROLL_RANGE; i++) {
//                 olderRows.push(calendarsData[0].clone().add(i - PAST_SCROLL_RANGE, 'month'))
//             }
//         }
//         setCalendarsData((prev) => [...olderRows, ...prev])
//     }
//
//     const loadMoreFeatureMonths = () => {
//         const featureRows = []
//         if (calendarsData.length) {
//             for (let i = 1; i <= FUTURE_SCROLL_RANGE; i++) {
//                 featureRows.push(calendarsData[calendarsData.length - 1].clone().add(i, 'month'))
//             }
//         }
//         setCalendarsData((prev) => [...prev, ...featureRows])
//     }
//
//     const renderItem = useCallback(({ item }) => {
//         return (
//             <View>
//                 <CalendarListItem
//                     item={item}
//                     calendarHeight={calendarHeight}
//                 />
//             </View>
//         )
//     }, [calendarHeight])
//
//     const handleScroll = (event) => {
//         const offset = event.nativeEvent.contentOffset.y
//         const isScrollAtStart = offset < 10 * calendarHeight
//         if (isScrollAtStart) {
//             loadMoreOlderMonths()
//         }
//     }
//
//     return (
//         <View style={styles.flatListContainer}>
//             <FlatList
//                 ref={listRef}
//                 initialListSize={PAST_SCROLL_RANGE + FUTURE_SCROLL_RANGE + 1}
//                 data={calendarsData}
//                 renderItem={renderItem}
//                 getItemLayout={getItemLayout}
//                 initialScrollIndex={todayDayIndex}
//                 // onScroll={handleScroll}
//                 onEndReached={loadMoreFeatureMonths}
//                 // onStartReached={loadMoreOlderMonths}
//                 // onStartReachedThreshold={10}
//                 onEndReachedThreshold={10}
//                 keyExtractor={props.keyExtractor}
//                 showsVerticalScrollIndicator={showScrollIndicator}
//                 showsHorizontalScrollIndicator={horizontal && showScrollIndicator}
//             />
//         </View>
//     )
// }
//
// export default InfiniteCalendarList
//
// InfiniteCalendarList.defaultProps = {
//     pastScrollRange: PAST_SCROLL_RANGE,
//     futureScrollRange: FUTURE_SCROLL_RANGE,
//     horizontal: false,
//     scrollEnabled: true,
//     keyExtractor: (item) => item.toString(),
//     showScrollIndicator: false,
// }