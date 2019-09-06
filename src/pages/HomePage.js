import React, { useEffect, useState } from 'react';
import GamesList from '../components/games/game-list/GamesList';
import { Header } from 'react-native-elements';
import GenerateExampleGames from '../test/GenerateExampleGames';
import Logout from '../components/auth/logout/Logout'
import { PaddingView } from '../components/UI/Containers/Containers'
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from 'react-native-firebase';
import { SafeAreaView } from 'react-native';

const HomePage = ({ navigation }) => {
    const [user, setUser] = useState('');

    const handleNavigation = () => {
        navigation.navigate('Profile', { uid: user.uid });
    }

    useEffect(() => {
        const { currentUser } = firebase.auth();
        setUser(currentUser);
        return () => {
        };
    }, [])
    return (
        <SafeAreaView>
            <Header
                leftComponent={
                    <Icon
                        color="#fff"
                        size={24}
                        name={'user'}
                        regular
                        onPress={handleNavigation} />}
                centerComponent={{ text: 'Word Tail', style: { color: '#fff' } }}
                rightComponent={<Icon color="#fff" size={24} name={'plus-circle'} regular />}
            />
            <PaddingView style={{height: '100%'}}>
                <Logout navigation={navigation} />
                <GamesList uid={user.uid} />
            </PaddingView>
            {/* <GenerateExampleGames /> */}
        </SafeAreaView>
    )
}

export default HomePage
