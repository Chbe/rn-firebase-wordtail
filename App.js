/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useEffect, useState } from 'react';
import {
  Text,
  View
} from 'react-native';

import firebase from 'react-native-firebase';
import { SafeWrapper, CenterView } from './src/components/UI/Containers/Containers';
import Login from './src/pages/Login';
import Logout from './src/components/auth/logout/Logout'

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => {
      if (unsubscriber)
        unsubscriber();
    };
  }, [])
  return (
    <Fragment>
      <SafeWrapper>
        <View>
          {!isLoading
            ? !user
              ? <Login />
              : <>
                <Logout />
                <Text>{JSON.stringify(user)}</Text>
              </>
            : <CenterView><Text>Loading...</Text></CenterView>}
        </View>
      </SafeWrapper>
    </Fragment>
  );
};

export default App;
