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

export default () =>
  <App ref={navigatorRef => {
    NavigationService.setTopLevelNavigator(navigatorRef);
  }} />;