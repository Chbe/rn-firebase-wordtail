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
import AuthLoadingPage from './pages/auth/AuthLoadingPage';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import AdministrationPage from './pages/admin/AdministrationPage';
import NavigationService from './services/navigation/NavigationService';
import GamePage from './pages/game/GamePage';
import CreateGamePage from './pages/create-game/CreateGamePage';
import { ThemeProvider } from 'react-native-elements'
import { getTheme } from './core/Themes'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { PaddingView } from './components/UI/Containers/Containers';
import { StatusBar } from 'react-native';

// test
import ComponentsPage from './test/ComponentsPage';
import GenerateExampleGames from './test/GenerateExampleGames';

const theme = getTheme('Shamrock');
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
  Home: {
    screen: HomePage,
    navigationOptions: {
      headerLeft: (
        <PaddingView>
          <FontAwesome5Icon
            color={theme.barStyle === 'light-content' ? '#fff' : '#000'}
            size={24}
            name='user-cog'
            onPress={() => NavigationService.navigate('Administration')} />
        </PaddingView>
      ),
      headerRight: (
        <PaddingView>
          <FontAwesome5Icon
            color={theme.barStyle === 'light-content' ? '#fff' : '#000'}
            size={24}
            name='plus-circle'
            onPress={() => NavigationService.navigate('CreateGame')} />
        </PaddingView>
      )
    }
  },
  Administration: AdministrationPage,
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
    <StatusBar backgroundColor={theme.colors.primary} barStyle={theme.barStyle} />
    <App ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef);
    }} />
  </ThemeProvider>;