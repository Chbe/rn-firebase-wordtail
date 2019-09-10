import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, StatusBar, SafeAreaView } from 'react-native'
import firebase from 'react-native-firebase';
import { Text } from 'react-native-elements';
import { CenterView, SafeWrapper } from '../components/UI/Containers/Containers';

const AuthLoadingPage = ({ navigation }) => {
    const unsubscriber = firebase.auth().onAuthStateChanged((user) => {
        if (unsubscriber)
            unsubscriber();
        navigation.navigate(user ? 'App' : 'Auth');
    });
    return (
        <SafeWrapper>
            <CenterView>
                <ActivityIndicator size="large" color="#0000ff" />
            </CenterView>
        </SafeWrapper>
    )
}

export default AuthLoadingPage
