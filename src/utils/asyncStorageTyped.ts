import AsyncStorage from '@react-native-async-storage/async-storage';

type StorageTyped = {
  '@language': string;
  '@token': string;
  '@isDynamicTheme': {
    status: boolean;
  };
};

type AsyncStorageKeysType = keyof StorageTyped;

type AsyncStorageValueType<T extends AsyncStorageKeysType> = StorageTyped[T];

const TypedAsyncStorage = {
  async getItem<T extends AsyncStorageKeysType>(
    key: T,
  ): Promise<AsyncStorageValueType<T> | null> {
    const jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue) {
      return JSON.parse(jsonValue);
    }
    return null;
  },
  setItem<T extends AsyncStorageKeysType>(
    key: T,
    value: AsyncStorageValueType<T>,
  ): Promise<void> {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: AsyncStorageKeysType): Promise<void> => {
    return AsyncStorage.removeItem(key);
  },
};

export default TypedAsyncStorage;
