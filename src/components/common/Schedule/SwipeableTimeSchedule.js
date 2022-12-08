import React, {useEffect, useState} from 'react';
import {SwipeGestureContainer, TimeSchedule} from '../../common';
import moment from 'moment';
import {calendarFormattedDate} from '../../../utils/dateUtils';

const mockEvents = [
  {
    description: 'Breakfast',
    dateStart: '2022-07-28',
    dateEnd: '2022-07-28',
    timeStart: '08:00',
    timeEnd: '08:50',
  },
  {
    description: 'Call a doctor',
    dateStart: '2022-07-29',
    dateEnd: '2022-07-29',
    timeStart: '10:00',
    timeEnd: '10:20',
  },
  {
    description: 'Call a sister',
    dateStart: '2022-07-29',
    dateEnd: '2022-07-29',
    timeStart: '11:00',
    timeEnd: '11:30',
  },
  {
    description: 'Work',
    dateStart: '2022-07-30',
    dateEnd: '2022-07-30',
    timeStart: '10:00',
    timeEnd: '13:20',
  },
  {
    description: 'Dinner',
    dateStart: '2022-07-27',
    dateEnd: '2022-07-27',
    timeStart: '13:00',
    timeEnd: '14:10',
  },
  {
    description: 'Call all clients',
    dateStart: '2022-07-26',
    dateEnd: '2022-07-26',
    timeStart: '14:00',
    timeEnd: '17:30',
  },
  {
    description: 'Watch serial',
    dateStart: '2022-07-25',
    dateEnd: '2022-07-25',
    timeStart: '19:00',
    timeEnd: '21:30',
  },
  {
    description: 'Watch doc',
    dateStart: '2022-07-24',
    dateEnd: '2022-07-24',
    timeStart: '19:00',
    timeEnd: '21:30',
  },
  {
    description: 'Watch film',
    dateStart: '2022-07-23',
    dateEnd: '2022-07-23',
    timeStart: '19:00',
    timeEnd: '21:30',
  },
  {
    description: 'Go to sea',
    dateStart: '2022-08-01',
    dateEnd: '2022-08-01',
    timeStart: '15:00',
    timeEnd: '18:30',
  },
  {
    description: 'Go to fitness',
    dateStart: '2022-08-02',
    dateEnd: '2022-08-02',
    timeStart: '14:00',
    timeEnd: '15:30',
  },
];

const SwipeableTimeSchedule = props => {
  const {initialDate, onSwipeLeft, onSwipeRight} = props;

  const [mainIndex, setMainIndex] = useState(0);

  const [period, setPeriod] = useState(() => {
    const date = initialDate || moment();
    return [
      calendarFormattedDate(date),
      calendarFormattedDate(moment(date).add(1, 'day')),
      calendarFormattedDate(moment(date).add(-1, 'day')),
    ];
  });

  const [events, setEvents] = useState({});

  useEffect(() => {
    let newPeriod = [];
    switch (mainIndex) {
      case 0: {
        newPeriod = [
          calendarFormattedDate(initialDate),
          calendarFormattedDate(moment(initialDate).add(1, 'day')),
          calendarFormattedDate(moment(initialDate).add(-1, 'day')),
        ];
        break;
      }
      case 1: {
        newPeriod = [
          calendarFormattedDate(moment(initialDate).add(-1, 'day')),
          calendarFormattedDate(initialDate),
          calendarFormattedDate(moment(initialDate).add(1, 'day')),
        ];
        break;
      }
      case 2: {
        newPeriod = [
          calendarFormattedDate(moment(initialDate).add(1, 'day')),
          calendarFormattedDate(moment(initialDate).add(-1, 'day')),
          calendarFormattedDate(initialDate),
        ];
        break;
      }
    }
    setPeriod(newPeriod);
  }, [initialDate, mainIndex]);

  useEffect(() => {
    // TODO
    /** Real request for get events */
    const eventsData = mockEvents.filter(ev =>
      period.some(day => day === ev.dateStart),
    );
    setEvents(_ => {
      let obj = {};
      period.forEach(
        propName =>
          (obj = {
            ...obj,
            [propName]: eventsData.filter(ev => ev.dateStart === propName),
          }),
      );
      return obj;
    });
  }, [period]);

  return (
    <SwipeGestureContainer
      rootViewContainerStyle={{flex: 1}}
      centerContent={<TimeSchedule eventsData={events[period[0]]} />}
      rightContent={<TimeSchedule eventsData={events[period[1]]} />}
      leftContent={<TimeSchedule eventsData={events[period[2]]} />}
      onIndexChange={index => setMainIndex(index)}
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
    />
  );
};

export default SwipeableTimeSchedule;
