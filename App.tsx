import React, {FC} from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";

const App: FC = () => {

  return (
    <NavigationContainer>
      <SafeAreaView>
        <Text>Hello</Text>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
