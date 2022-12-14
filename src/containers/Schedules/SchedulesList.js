import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, View, Text, RefreshControl} from 'react-native';
import ScheduleItem from './ScheduleItem';
import styles from './styles';
import {getMySchedules, getOtherSchedules} from '../../requests/schedule';

const ListEmptyComponent = ({translate}) => (
  <View style={styles.noDataContainer}>
    <Text>{translate('search.noSchedulesYet')}</Text>
  </View>
);

const Separator = () => <View style={styles.separator} />;

const schedulesReq = {
  my: getMySchedules,
  other: getOtherSchedules,
};

const SchedulesList = ({translate, navigation, type = 'my'}) => {
  const [schedulesData, setSchedulesData] = useState([]);
  const [isLoadingSchedules, setIsLoadingSchedules] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSchedules = useCallback(
    async (nextPage, isRefresh = false) => {
      try {
        const res = await schedulesReq[type]({page: nextPage, limit: 6});
        if (res?.data) {
          const {results, totalPages: total} = res?.data;
          setSchedulesData(prev =>
            !prev.length || isRefresh ? results : [...prev, ...results],
          );
          setPage(nextPage);
          setTotalPages(total);
        }
      } catch (_) {
        setSchedulesData([]);
      }
    },
    [type],
  );

  const loadMore = useCallback(async () => {
    if (!isLoadingSchedules && page < totalPages) {
      setIsLoadingSchedules(true);
      await fetchSchedules(page + 1);
      setIsLoadingSchedules(false);
    }
  }, [fetchSchedules, page, isLoadingSchedules, totalPages]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchSchedules(1, true);
    } finally {
      setPage(1);
      setRefreshing(false);
    }
  }, [fetchSchedules]);

  const renderItem = useCallback(
    ({item}) => {
      return (
        <ScheduleItem
          {...item}
          onItemPress={() => navigation.navigate('Schedule')}
        />
      );
    },
    [navigation],
  );

  useEffect(() => {
    fetchSchedules(1);
  }, [fetchSchedules]);
  return (
    <>
      <FlatList
        data={schedulesData}
        renderItem={renderItem}
        ListEmptyComponent={<ListEmptyComponent translate={translate} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={[
          styles.scrollContentContainer,
          schedulesData ? styles.withoutBottomPadding : {},
        ]}
        onEndReached={loadMore}
        onEndReachedThreshold={0.6}
        ItemSeparatorComponent={Separator}
        keyExtractor={item => item.id.toString()}
      />
    </>
  );
};

export default SchedulesList;
