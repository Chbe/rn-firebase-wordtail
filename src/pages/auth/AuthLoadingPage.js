import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, StatusBar, SafeAreaView } from 'react-native'
import firebase from 'react-native-firebase';
import { Text, withTheme } from 'react-native-elements';
import { CenterView, SafeWrapper } from '../../components/UI/Containers/Containers';

const AuthLoadingPage = ({ navigation, theme }) => {
    const unsubscriber = firebase.auth().onAuthStateChanged((user) => {
        if (unsubscriber)
            unsubscriber();
        navigation.navigate(user ? 'App' : 'Auth');
    });
    return (
        <SafeWrapper bg={theme.colors.lightShade}>
            <CenterView style={{ height: '100%' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </CenterView>
        </SafeWrapper>
    )
}

export default withTheme(AuthLoadingPage)
