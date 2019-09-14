import React, { useEffect, useState } from 'react';
import GamesList from '../components/game/game-list/GamesList';
import GenerateExampleGames from '../test/GenerateExampleGames';
import { PaddingView, SafeWrapper } from '../components/UI/Containers/Containers'
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from 'react-native-firebase';
import NavigationService from '../services/navigation/NavigationService'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { StatusBar } from 'react-native';
import { withTheme } from 'react-native-elements';

const HomePage = ({ navigation, theme }) => {
    const [user, setUser] = useState('');

    useEffect(() => {
        const { currentUser } = firebase.auth();
        setUser(currentUser);
        return () => {
        };
    }, [])
    return (
        <SafeWrapper bg={theme.colors.lightShade}>
            {/* <GenerateExampleGames /> */}
            <PaddingView style={{ height: '100%' }}>
                <GamesList navigation={navigation} uid={user.uid} />
            </PaddingView>
        </SafeWrapper>
    )
}

export default withTheme(HomePage)
