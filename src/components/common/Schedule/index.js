import React from 'react'
import {ScrollView, Text, View, StyleSheet} from 'react-native'
import {TIME_INTERVALS} from "../../../constants/time";
import {COLORS} from "../../../constants/global";

const styles = StyleSheet.create({
    intervalContainer: {
        flexDirection: 'row',
        height: 60,
    },
    timeText: {
        color: COLORS.GRAY,
        fontSize: 13,
    },

})

const TimeSchedule = (props) => {

    const {
        eventsData = [],
    } = props

    return (
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingTop: 5 }}
            // showsVerticalScrollIndicator={false}
        >
            {TIME_INTERVALS.map((time, index) => (
                <View key={index} style={styles.intervalContainer}>
                    <Text style={styles.timeText}>{time}</Text>
                </View>
            ))}
        </ScrollView>
    )
}

export default TimeSchedule