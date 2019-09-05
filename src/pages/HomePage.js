import React, { useEffect, useState } from 'react';
import GamesList from '../components/games/game-list/GamesList';
import { Header } from 'react-native-elements';
import GenerateExampleGames from '../test/GenerateExampleGames';
import Logout from '../components/auth/logout/Logout'
import { PaddingView } from '../components/UI/Containers/Containers'
import Icon from 'react-native-vector-icons/FontAwesome5';

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
                leftComponent={<Icon color="#fff" size={24} name={'user'} regular />}
                centerComponent={{ text: 'Word Tail', style: { color: '#fff' } }}
                rightComponent={<Icon color="#fff" size={24} name={'plus-circle'} regular />}
            />
            <PaddingView>
                <Logout />
                <GamesList uid={userUid} />
            </PaddingView>
            {/* <GenerateExampleGames /> */}
        </>
    )
}

export default HomePage
