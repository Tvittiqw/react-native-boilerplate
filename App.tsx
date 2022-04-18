import React, {FC, useEffect, useState} from 'react';
import {Provider} from "react-redux";
import store from "./src/redux/store";
import StackNavigator from "./src/navigation/StackNavigator";
import {SplashScreen} from "./src/screens";

const App: FC = () => {

    const [isInit, setInit] = useState(false);

    return (
        <Provider store={store}>
            {
                !isInit
                    ? <SplashScreen setInitApp={setInit}/>
                    : <StackNavigator/>
            }
        </Provider>
    );
};

export default App;
