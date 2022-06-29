import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    marginTop: 40,
    alignItems: 'center',
    flex: 1,
    paddingBottom: 50,
  },
  loginText: {
    fontSize: 36,
    marginBottom: 20,
  },
  navLink: {
    color: 'blue',
  },
  socialContainer: {
    width: '70%',
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
  },
  socialButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
  },
  registerContainer: {
    marginTop: 'auto',
    flexDirection: 'row',
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

export default styles;
