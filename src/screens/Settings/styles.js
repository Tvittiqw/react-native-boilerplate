import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  userInfoContainer: {
    marginTop: 40,
  },
  themeContainer: {
    marginTop: 90,
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aboutContainer: {
    marginTop: 'auto',
  },
  logoutContainer: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  navLink: {
    color: 'blue',
    fontSize: 20,
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

export default styles;
