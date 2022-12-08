import * as Keychain from 'react-native-keychain';

const NAME = 'TOKENS';

const SecureStore = {
  setTokens: async (accessToken, refreshToken) => {
    const passwordObj = {
      accessToken,
      refreshToken,
    };
    await Keychain.setGenericPassword(NAME, JSON.stringify(passwordObj));
  },
  getAccessToken: async () => {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return JSON.parse(credentials.password).accessToken;
    } else {
      return null;
    }
  },
  getRefreshToken: async () => {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return JSON.parse(credentials.password).refreshToken;
    } else {
      return null;
    }
  },
  clearStore: async () => {
    await Keychain.resetGenericPassword();
  },
};

export default SecureStore;
