// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

// import React, { Fragment, useEffect, useState } from 'react';
// import {
//   Text,
//   View
// } from 'react-native';

// import firebase from 'react-native-firebase';
// import { SafeWrapper, CenterView } from './components/UI/Containers/Containers';
// import LoginPage from './pages/LoginPage';
// import Logout from './components/auth/logout/Logout'
// import HomePage from './pages/HomePage';
// import { ThemeProvider, colors } from 'react-native-elements';
// import { Platform } from 'react-native';
// const theme = {
//   colors: {
//     ...Platform.select({
//       default: colors.platform.android,
//       ios: colors.platform.ios,
//     }),
//   },
// };
// const App = () => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscriber = firebase.auth().onAuthStateChanged((user) => {
//       setUser(user);
//       setLoading(false);
//     });
//     return () => {
//       if (unsubscriber)
//         unsubscriber();
//     };
//   }, [])
//   return (
//     <ThemeProvider theme={theme}>
//       <SafeWrapper>
//         <View>
//           {!isLoading
//             ? !user
//               ? <LoginPage />
//               : <HomePage user={user} />
//             : <CenterView><Text>Loading...</Text></CenterView>}
//         </View>
//       </SafeWrapper>
//     </ThemeProvider>
//   );
// };

// export default App;

import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AuthLoadingPage from './pages/AuthLoadingPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

const AppStack = createStackNavigator({ Home: HomePage });
const AuthStack = createStackNavigator({ Login: LoginPage });

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingPage,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)
const App = createAppContainer(AppNavigator);

export default App;