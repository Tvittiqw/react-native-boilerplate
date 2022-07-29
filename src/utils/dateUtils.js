import moment from 'moment'

const CALENDAR_DATE_FORMAT = 'YYYY-MM-DD'

export const isValidDate = (date) => {
    return date && moment(date).isValid()
}

export const calendarFormattedDate = (date) => {
    if (isValidDate(date)) {
        return moment(date).format(CALENDAR_DATE_FORMAT)
    }
}

export const dateToData = (date) => {
    const d = moment(date)
    return {
        day: d.date(),
        month: d.month() + 1,
        year: d.year(),
        dateString: calendarFormattedDate(date)
    }
}

export const sameMonth = (a, b) => {
    if (isValidDate(a) && isValidDate(b)) {
        const firstDate = moment(a)
        const secondDate = moment(b)
        return firstDate.year() === secondDate.year() && firstDate.month() === secondDate.month()
    } else {
        return false
    }
}

export const sameDay = (a, b) => {
    if (isValidDate(a) && isValidDate(b)) {
        const firstDate = moment(a)
        const secondDate = moment(b)
        return firstDate.date() === secondDate.date()
    } else {
        return false
    }
}

export const sameWeekDays = (arr1, arr2) => {
    const a = Array.from(arr1)
    const b = Array.from(arr2)
    if (a.length !== 7 || b.length !== 7) {
        throw new Error('The length of each week array must be 7')
    }
    return a.every((element, index) => sameDay(element, b[index]))
}

export const sameDate = (a, b) => {
    if (isValidDate(a) && isValidDate(b)) {
        return sameDay(a, b) && sameMonth(a, b)
    } else {
        return false
    }
}

export const isToday = (date) => {
    return sameDate(date, moment())
}

export const fromTo = (a, b) => {
    const days = []
    let from = a
    const to = +b
    for (; from <= to; from = moment(from).add(1, 'day')) {
        days.push(moment(from))
    }
    return days
}

export const monthFirstAndLastDays = (date) => {
    const startOfMonth = moment(date).startOf('month')
    const endOfMonth = moment(date).endOf('month')

    return { startOfMonth, endOfMonth }
}

export const month = (date) => {
    const { startOfMonth, endOfMonth } = monthFirstAndLastDays(date)
    return fromTo(startOfMonth, endOfMonth)
}

export const calendarPage = (date, hideExtraDays = false) => {
    const before = []
    const after = []
    const days = month(date)

    const from = days[0].clone()
    if (from.isoWeekday() % 7 !== 1) {
        let diff = from.isoWeekday() - 1
        while (diff !== 0) {
            if (!hideExtraDays) {
                before.push(from.clone().add(-diff, 'days'))
            } else {
                before.push(null)
            }
            diff--
        }
    }

    const to = days[days.length - 1].clone()
    if (to.isoWeekday() % 7 !== 0) {
        let diff = 7 - to.isoWeekday() % 7
        while (diff !== 0) {
            if (!hideExtraDays) {
                after.unshift(to.clone().add(diff, 'days'))
            } else {
                after.unshift(null)
            }
            diff--
        }
    }

    return [...before, ...days, ...after]
}

export const weekFirstAndLastDays = (date) => {
    const startOfWeek = moment(date).startOf('isoWeek')
    const endOfWeek = moment(date).endOf('isoWeek')

    return { startOfWeek, endOfWeek }
}

export const weekPage = (date) => {
    const week = []
    const { startOfWeek } = weekFirstAndLastDays(date)
    for (let i = 0; i < 7; i++) {
        week.push(startOfWeek.clone().add(i, 'day'))
    }
    return week
}

export const getOffsetWeekDay = (date, offset = 0, isCalendarFormat = false) => {
    if (!date) {
        return
    }
    const day = moment(date).add(offset, 'week')
    return isCalendarFormat ? day.format(CALENDAR_DATE_FORMAT) : day
}

export const sameTimes = (a, b, date) => {
    let time1 = moment(a)
    let time2 = moment(b)
    if (date) {
        time1 = moment(`${date} ${a}`)
        time2 = moment(`${date} ${b}`)
    }
    return moment(time1).isSame(time2)
}