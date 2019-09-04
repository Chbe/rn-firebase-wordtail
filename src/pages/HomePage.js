import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import GamesList from '../components/games/GamesList';
import { Header } from 'react-native-elements';
import GenerateExampleGames from '../test/GenerateExampleGames';
import Logout from '../components/auth/logout/Logout'

const HomePage = ({ user }) => {
    const [userUid, setUid] = useState('');

    useEffect(() => {
        setUid(user.uid);
        return () => {

        };
    }, [user])
    return (
        <>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
            />
            <View>
                <Logout />
                <GamesList uid={userUid} />
            </View>
            {/* <GenerateExampleGames /> */}
        </>
    )
}

export default HomePage
