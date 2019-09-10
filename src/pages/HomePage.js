import React, { useEffect, useState } from 'react';
import GamesList from '../components/game/game-list/GamesList';
import GenerateExampleGames from '../test/GenerateExampleGames';
import { PaddingView } from '../components/UI/Containers/Containers'
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from 'react-native-firebase';
import { SafeAreaView } from 'react-native';
import NavigationService from '../services/navigation/NavigationService'

const HomePage = ({ navigation }) => {
    const [user, setUser] = useState('');

    useEffect(() => {
        const { currentUser } = firebase.auth();
        setUser(currentUser);
        return () => {
        };
    }, [])
    return (
        <SafeAreaView>
            {/* <GenerateExampleGames /> */}
            <PaddingView style={{ height: '100%' }}>
                <GamesList navigation={navigation} uid={user.uid} />
            </PaddingView>
        </SafeAreaView>
    )
}

HomePage.navigationOptions = {
    headerLeft: (
        <PaddingView>
            <Icon
                color="#000"
                size={24}
                name={'user'}
                regular
                onPress={() => NavigationService.navigate('Profile',
                    { uid: firebase.auth().currentUser.uid })} />
        </PaddingView>
    ),
    headerRight: (
        <PaddingView>
            <Icon
                color="#000"
                size={24}
                name={'plus-circle'}
                regular />
        </PaddingView>
    )
};

export default HomePage
