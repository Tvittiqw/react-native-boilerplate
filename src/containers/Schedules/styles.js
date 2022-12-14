import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  scrollContentContainer: {
    flexGrow: 1,
    paddingBottom: 30,
    paddingHorizontal: 14,
  },
  withoutBottomPadding: {
    paddingBottom: 0,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    padding: 20,
    width: '100%',
    height: 250,
    backgroundColor: 'gray',
  },
  separator: {
    height: 20,
  },
});

export default styles;
