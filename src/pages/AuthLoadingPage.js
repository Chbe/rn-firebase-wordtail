import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, StatusBar } from 'react-native'
import firebase from 'react-native-firebase';
import { Text } from 'react-native-elements';
import { CenterView } from '../components/UI/Containers/Containers';

const AuthLoadingPage = ({ navigation }) => {
    useEffect(() => {
        const unsubscriber = firebase.auth().onAuthStateChanged((user) => {
            navigation.navigate(user ? 'App' : 'Auth');
        });
        return () => {
            if (unsubscriber)
                unsubscriber();
        };
    }, [])
    return (
        <CenterView>
            <ActivityIndicator size="large" color="#0000ff" />
        </CenterView>
    )
}

export default AuthLoadingPage
