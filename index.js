import App from "./App";
import { Provider } from "react-redux";
import newStore from './redux-setup/store/';
import { registerRootComponent } from "expo";
import { useEffect } from "react";

const ReduxProvider = () => {
  return (    
    <Provider store={newStore}>    
      <App />
    </Provider>
  );
};

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(ReduxProvider);