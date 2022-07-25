import React, {useMemo, useState} from 'react'
import {SafeAreaView, StyleSheet, Text, View} from 'react-native'
import moment from 'moment'
import {useTranslation} from 'react-i18next';
import WeekCalendar from '../../components/CustomCalendar/WeekCalendar'
import {TimeSchedule} from "../../components/common";
import SwipeableWeekCalendar from "../../components/CustomCalendar/WeekCalendar/SwipeableWeekCalendar";

const mockEvents = [
    { description: 'Breakfast', dateStart: '2022-07-18', dateEnd: '2022-07-18', timeStart: '08:30', timeEnd: '08:50' },
    { description: 'Call a doctor', dateStart: '2022-07-18', dateEnd: '2022-07-18', timeStart: '10:00', timeEnd: '10:20' },
    { description: 'Work', dateStart: '2022-07-18', dateEnd: '2022-07-18', timeStart: '10:30', timeEnd: '13:20' },
    { description: 'Dinner', dateStart: '2022-07-18', dateEnd: '2022-07-18', timeStart: '13:20', timeEnd: '14:10' },
    { description: 'Call all clients', dateStart: '2022-07-18', dateEnd: '2022-07-18', timeStart: '14:15', timeEnd: '17:30' },
    { description: 'Watch serial', dateStart: '2022-07-18', dateEnd: '2022-07-18', timeStart: '19:00', timeEnd: '21:30' },
]

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: 16,
        borderBottomWidth: 0.2,
        borderBottomColor: 'gray',
        paddingBottom: 3,
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
    }
})

const Header = (props) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerTopRow}>
                <Text>{props.text}</Text>
            </View>
            {props.children}
        </View>
    )
}

const ScheduleScreen = ({ navigation, route }) => {

    const [selectedDay, setSelectedDay] = useState(route.params?.selectedDay || moment())

    const {i18n} = useTranslation()

    const headerMonthText = useMemo(() => {
        return moment(selectedDay).format('MMMM')
    }, [selectedDay, i18n.language])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <Header text={headerMonthText}>
                    <SwipeableWeekCalendar
                        startWeekDate={selectedDay}
                        selectedDate={selectedDay}
                        onPressDay={(date) => setSelectedDay(date)}
                        onSwipeLeft={() => {}}
                        onSwipeRight={() => {}}
                    />
            </Header>
            <View style={{ flex: 1, paddingLeft: 20 }}>
                <TimeSchedule/>
            </View>
        </SafeAreaView>
    )
}

export default ScheduleScreen