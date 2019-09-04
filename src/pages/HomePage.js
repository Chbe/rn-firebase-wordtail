import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import GamesList from '../components/games/GamesList';
import { Header } from 'react-native-elements';

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
            <GamesList uid={userUid} />
        </>
    )
}

export default HomePage
