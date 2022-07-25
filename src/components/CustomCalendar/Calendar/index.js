import React, {useCallback, useEffect, useState} from 'react'
import moment from 'moment'
import {StyleSheet, View, Button, Text} from 'react-native'
import {calendarFormattedDate, sameMonth, sameDate, calendarPage, isToday} from '../../../utils/dateUtils'
import Day from "./day";
import {COLORS} from "../../../constants/global";
import {WeekNamesComponent} from '../../common'

const styles = StyleSheet.create({
    calendarContainer: {
        paddingHorizontal: 5
    },
    dayContainer: {
        flex: 1,
        alignItems: 'center',
    },
    week: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 8,
    },
    monthContainer: {
        backgroundColor: COLORS.WHITE,
    },
    weekDayText: {
        color: 'gray'
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 4,
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
    }
})

const Calendar = (props) => {
    const {
        hideArrows = false,
        hideExtraDays = false,
        initialDate,
        onPressDay,
        style: propsStyle = {},
    } = props

    const [currentMonth, setCurrentMonth] = useState(initialDate ? moment(initialDate) : moment())
    const [selectedDay, setSelectedDay] = useState(null)

    useEffect(() => {
        if (initialDate) {
            setCurrentMonth(moment(initialDate))
        }
    }, [initialDate])

    const updateMonth = useCallback((newMonth) => {
        if (sameMonth(newMonth, currentMonth)) {
            return
        }
        setCurrentMonth(newMonth)
    }, [currentMonth])

    const addMonth = useCallback((count) => {
        const newMonth = currentMonth.clone().add(count, 'M')
        updateMonth(newMonth)
    }, [currentMonth, updateMonth])

    const handleDayInteraction = useCallback((date, interaction) => {
        const day = moment(date)
        updateMonth(day)
        setSelectedDay(day)
        interaction && interaction(date)
    }, [updateMonth])

    const pressDayHandle = useCallback((date) => {
        if (date) {
            handleDayInteraction(date, onPressDay)
        }
    }, [handleDayInteraction, onPressDay])

    const renderDay = (day, id) => {
        const isSelected = selectedDay && sameDate(day, selectedDay)
        let todayStatus
        if (isToday(day)) {
            if (!selectedDay) {
                todayStatus = 'today'
            } else {
                todayStatus = 'today-no-active'
            }
        } else {
            todayStatus = 'not-today'
        }
        return (
            <View key={id} style={styles.dayContainer}>
                {day ? (
                    <Day
                        date={calendarFormattedDate(day)}
                        onPressDay={pressDayHandle}
                        isSelected={isSelected}
                        todayState={todayStatus}
                    />
                ) : null}
            </View>
        )
    }

    const renderWeek = (days, id) => {
        const week = []
        days.forEach((day, id2) => {
            week.push(renderDay(day, id2))
        })
        return (
            <View key={id} style={styles.week}>
                {week}
            </View>
        )
    }

    const renderMonth = () => {
        const days = calendarPage(currentMonth.clone(), hideExtraDays)
        const weeks = []

        while (days.length) {
            weeks.push(renderWeek(days.splice(0, 7), weeks.length))
        }

        return (
            <View style={styles.monthContainer}>
                <WeekNamesComponent/>
                {weeks}
            </View>
        )
    }

    const renderHeader = () => {
        const month = currentMonth.clone().format('MMMM')
        const year = currentMonth.year()
        const textElement = <Text style={styles.headerText}>{`${month + ' ' + year}`}</Text>
        return (
            <>
                {!hideArrows ? (
                    <View style={[styles.calendarHeader]}>
                        <Button title={'Prev'} onPress={() => addMonth(-1)}/>
                        {textElement}
                        <Button title={'Next'} onPress={() => addMonth(1)}/>
                    </View>
                ) : (
                    <View style={{ alignItems: 'center', paddingVertical: 5 }}>
                        {textElement}
                    </View>
                )}
            </>
        )
    }

    return (
        <View style={[styles.calendarContainer, propsStyle]}>
            {renderHeader()}
            {renderMonth()}
        </View>
    )
}

export default React.memo(Calendar)