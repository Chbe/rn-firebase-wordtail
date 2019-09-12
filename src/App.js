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
import { ThemeProvider } from 'react-native-elements'
import { getTheme } from './core/Themes'


// test
import ComponentsPage from './test/ComponentsPage';

const theme = getTheme();
const defaultNavigationOptions = {
  /** a style object that will be applied to the View that wraps the header. 
     *  If you set backgroundColor on it, that will be the color of your header. */
  headerStyle: {
    backgroundColor: theme.colors.primary,
  },
  /** the back button and title both use this property as their color. 
   *  In the example below, we set the tint color to white (#fff) so 
   *  the back button and the header title would be white. */
  headerTintColor: theme.barStyle === 'light-content' ? '#fff' : '#000',
  /** if we want to customize the fontFamily, fontWeight and 
   *  other Text style properties for the title, we can use this to do it. */
  headerTitleStyle: {
    fontWeight: 'bold',
  }
};

const AppStack = createStackNavigator({
  Home: HomePage,
  Profile: ProfilePage,
  Game: GamePage,
  CreateGame: CreateGamePage
}, {
  defaultNavigationOptions
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
    initialRouteName: 'AuthLoading'
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
  <ThemeProvider theme={theme}>
    <App ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef);
    }} />
  </ThemeProvider>;