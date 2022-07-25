/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import "./src/i18n/i18n";
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => App);
