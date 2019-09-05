import React, { useEffect, useState } from 'react';
import GamesList from '../components/games/game-list/GamesList';
import { Header } from 'react-native-elements';
import GenerateExampleGames from '../test/GenerateExampleGames';
import Logout from '../components/auth/logout/Logout'
import { PaddingView } from '../components/UI/Containers/Containers'
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from 'react-native-firebase';

const HomePage = ({ navigation }) => {
    const [user, setUser] = useState('');

    useEffect(() => {
        const user = firebase.auth().currentUser;
        setUser(user);
        return () => {
        };
    }, [])
    return (
        <>
            <Header
                leftComponent={<Icon color="#fff" size={24} name={'user'} regular />}
                centerComponent={{ text: 'Word Tail', style: { color: '#fff' } }}
                rightComponent={<Icon color="#fff" size={24} name={'plus-circle'} regular />}
            />
            <PaddingView>
                <Logout navigation={navigation} />
                <GamesList uid={user.uid} />
            </PaddingView>
            {/* <GenerateExampleGames /> */}
        </>
    )
}

export default HomePage
