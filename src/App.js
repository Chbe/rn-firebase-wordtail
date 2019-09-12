/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import AuthLoadingPage from './pages/AuthLoadingPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import NavigationService from './services/navigation/NavigationService';
import GamePage from './pages/GamePage';
import CreateGamePage from './pages/CreateGamePage';
import { ThemeProvider } from 'styled-components'


// test
import ComponentsPage from './test/ComponentsPage';


const AppStack = createStackNavigator({
  Home: HomePage,
  Profile: ProfilePage,
  Game: GamePage,
  CreateGame: CreateGamePage
});

const AuthStack = createStackNavigator({ Login: LoginPage }, {
  headerMode: 'none'
});

const AppNavigator = createAnimatedSwitchNavigator(
  {
    AuthLoading: AuthLoadingPage,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
  {
    // The previous screen will slide to the bottom while the next screen will fade in
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-bottom"
          durationMs={100}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={200} />
      </Transition.Together>
    ),
  }
);

const App = createAppContainer(AppNavigator);

const theme = {
  colors: {
    primary: '#da2555',
    'primary-disabled': 'rgba(218, 37, 85, 0.5)',
    info: '#282131',
    'info-disabled': 'rgba(40, 33, 49, 0.5)',
    success: '#6ea96a',
    'success-disabled': 'rgba(110, 169, 106, 0.5)',
    warning: '#eb9932',
    'warning-disabled': 'rgba(235, 153, 50, 0.5)',
    danger: '#f44336',
    'danger-disabled': 'rgba(244, 67, 54, 0.5)',
    light: '#fff',
    'light-disabled': 'rgba(255, 255, 255, 0.5)',
    dark: '#000',
    'dark-disabled': 'rgba(0, 0, 0, 0.5)',
  },
  padding: '12px',
  borderRadius: 10,
  fontSize: 18
}

export default () =>
  <ThemeProvider theme={theme}>
    <App ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef);
    }} />
  </ThemeProvider>;