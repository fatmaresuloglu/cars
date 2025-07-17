import {AppRegistry} from 'react-native';

import App from './App';
import {name as appName} from './app.json';

declare global {
  // eslint-disable-next-line no-var
  var global: typeof globalThis;
}
globalThis.global = globalThis;

AppRegistry.registerComponent(appName, () => App);

export default App;
