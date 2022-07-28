import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {TIME_INTERVALS} from "../../../constants/time";
import {COLORS} from "../../../constants/global";
import {sameTimes} from "../../../utils/dateUtils";
import {ScrollView} from 'react-native-gesture-handler'

const styles = StyleSheet.create({
    intervalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
    },
    timeText: {
        color: COLORS.GRAY,
        fontSize: 13,
    },

})

const TimeSchedule = (props) => {

    const {
        eventsData
    } = props

    return (
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingTop: 5 }}
            scrollEnabled={true}
            // showsVerticalScrollIndicator={false}
        >
            {TIME_INTERVALS.map((time, index) => {
                const event = !Array.isArray(eventsData)
                    ? null
                    : eventsData.find((ev) => sameTimes(time, ev.timeStart, ev.dateStart))
                return (
                <View key={index} style={styles.intervalContainer}>
                    <Text style={styles.timeText}>{time}</Text>
                    {event && <Text>{event.description}</Text>}
                </View>
                )
            })}
        </ScrollView>
    )
}

export default TimeSchedule