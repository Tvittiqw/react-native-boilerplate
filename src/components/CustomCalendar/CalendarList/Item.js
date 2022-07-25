import React, {useMemo} from 'react'
import Calendar from '../Calendar'
import {calendarFormattedDate} from '../../../utils/dateUtils'

const CalendarListItem = (props) => {
    const { item, calendarHeight, ...calendarProps } = props

    const calendarStyle = useMemo(() => {
        return {
            minHeight: calendarHeight
        }
    }, [calendarHeight])

    return (
        <Calendar
            {...calendarProps}
            initialDate={calendarFormattedDate(item)}
            hideExtraDays={true}
            hideArrows={true}
            style={calendarStyle}
        />
    )
}

export default React.memo(CalendarListItem)