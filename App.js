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
import HelloWorldScreen from 'screens/HelloWorldScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


const AppNavigator = createStackNavigator({
    Home: {
      screen: CafeListScreen
    },
    Details: {
      screen: CafeDetailsScreen
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

const AppContainer = createAppContainer(AppNavigator);

const App: () => React$Node = () => {
  return (
    <AppContainer />
  );
};

export default App;
