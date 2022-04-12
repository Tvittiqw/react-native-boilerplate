import React, {FC} from 'react';
import {Provider} from "react-redux";
import store from "./src/redux/store";
import StackNavigator from "./src/navigation/StackNavigator";

const App: FC = () => {

  return (
      <Provider store={store}>
        <StackNavigator/>
      </Provider>
  );
};

export default App;
