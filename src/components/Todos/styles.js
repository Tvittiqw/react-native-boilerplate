import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/global';

export default StyleSheet.create({
  todosWrapper: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    position: 'relative',
  },
  todoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  todosList: {
    height: '85%',
    flexGrow: 0,
  },
  header: {
    color: COLORS.BLACK,
    textAlign: 'center',
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
