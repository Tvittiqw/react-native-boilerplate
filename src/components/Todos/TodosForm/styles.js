import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  todoForm: {
    width: '100%',
    bottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderTopColor: 'black',
    borderTopWidth: 1,
  },
  formFieldContainer: {
    marginTop: 35,
    width: '80%',
  },
  error: {
    width: '100%',
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
