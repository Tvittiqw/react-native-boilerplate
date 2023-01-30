import React, {useMemo, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {SwipeableTimeSchedule} from '../../components/common';
import Todos from '../../components/Todos';
import SwipeableWeekCalendar from '../../components/CustomCalendar/WeekCalendar/SwipeableWeekCalendar';
import {COLORS} from '../../constants/global';
import {calendarFormattedDate} from '../../utils/dateUtils';
import Modal from 'react-native-modal';
import apiClient from '../../services/apiClient';

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    borderBottomWidth: 0.25,
    borderBottomColor: 'gray',
    paddingBottom: 3,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  goBackText: {
    color: COLORS.BLUE,
  },
  modalContentWrapper: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    marginBottom: 100,
    marginTop: 0,
    borderRadius: 40,
  },
});

const Header = props => {
  const {children, rightTopElement = null, leftTopElement = null} = props;
  return (
    <View style={styles.headerContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {leftTopElement ? (
          leftTopElement
        ) : (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={props.onGoBackHandle}
            style={styles.headerTopRow}>
            <Text style={styles.goBackText}>{props.text}</Text>
          </TouchableOpacity>
        )}
        {rightTopElement}
      </View>
      {children}
    </View>
  );
};

const ScheduleScreen = ({navigation, route}) => {
  const [selectedDay, setSelectedDay] = useState(
    route.params?.selectedDay || moment(),
  );

  const [isModalVisible, setModalVisible] = useState(false);

  const {i18n} = useTranslation();

  const headerMonthText = useMemo(() => {
    return moment(selectedDay).format('MMMM,yy');
  }, [selectedDay, i18n.language]);

  const calendarSwipeHandle = newCurrentWeekDate => {
    setSelectedDay(newCurrentWeekDate);
  };

  const scheduleSwipeLeftHandle = () => {
    setSelectedDay(prev => calendarFormattedDate(moment(prev).add(1, 'day')));
  };

  const scheduleSwipeRightHandle = () => {
    setSelectedDay(prev => calendarFormattedDate(moment(prev).add(-1, 'day')));
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        text={headerMonthText}
        onGoBackHandle={navigation.goBack}
        rightTopElement={
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.goBackText}>{'Create todo'}</Text>
          </TouchableOpacity>
        }>
        <SwipeableWeekCalendar
          startWeekDate={selectedDay}
          selectedDate={selectedDay}
          onPressDay={date => setSelectedDay(date)}
          onSwipeLeft={calendarSwipeHandle}
          onSwipeRight={calendarSwipeHandle}
        />
      </Header>
      <View style={{flex: 1, paddingLeft: 20}}>
        <SwipeableTimeSchedule
          initialDate={selectedDay}
          onSwipeLeft={scheduleSwipeLeftHandle}
          onSwipeRight={scheduleSwipeRightHandle}
        />
      </View>
      <Modal
        animationIn="slideInDown"
        animationOut="slideOutUp"
        isVisible={isModalVisible}
        animationInTiming={700}
        animationOutTiming={700}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={500}
        // swipeDirection={['up']}
        // onSwipeComplete={closeModal}
        onBackdropPress={closeModal}
        style={{margin: 0}}>
        <View style={styles.modalContentWrapper}>
          <Todos />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ScheduleScreen;
