import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  signupForm: {
    width: '100%',
  },
  formFieldContainer: {
    marginTop: 30,
  },
  stepperWrapper: {
    flexDirection: 'row',
    marginTop: 50,
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  line: {
    width: 50,
    height: 1,
    margin: 10,
    backgroundColor: 'black',
  },
  activeCircle: {
    backgroundColor: 'blue',
  },
  stepperText: {
    color: 'white',
  },
});
