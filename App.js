/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import CafeListScreen from 'screens/CafeListScreen';
import CafeDetailsScreen from 'screens/CafeDetailsScreen';
import {createStackNavigator, createAppContainer} from "react-navigation";


const AppNavigator = createStackNavigator({
    Home: {
      screen: HelloWorldScreen
    },
    Details: {
      screen: HelloWorldScreen
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
      headerTitleStyle: {

      },
    },
  }
);

const App: () => React$Node = () => {
  return (
    <AppContainer />
  );
};

export default App;
