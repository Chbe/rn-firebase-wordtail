import React, { useEffect, useState } from 'react';
import GamesList from '../components/game/game-list/GamesList';
import GenerateExampleGames from '../test/GenerateExampleGames';
import { PaddingView, SafeWrapper } from '../components/UI/Containers/Containers'
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from 'react-native-firebase';
import NavigationService from '../services/navigation/NavigationService'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const HomePage = ({ navigation }) => {
    const [user, setUser] = useState('');

    useEffect(() => {
        const { currentUser } = firebase.auth();
        setUser(currentUser);
        return () => {
        };
    }, [])
    return (
        <SafeWrapper>
            {/* <GenerateExampleGames /> */}
            <PaddingView style={{ height: '100%' }}>
                <GamesList navigation={navigation} uid={user.uid} />
            </PaddingView>
        </SafeWrapper>
    )
}

HomePage.navigationOptions = {
    headerLeft: (
        <PaddingView>
            <FontAwesome5Icon
                size={24}
                name='user'
                onPress={() => NavigationService.navigate('Profile')} />
        </PaddingView>
    ),
    headerRight: (
        <PaddingView>
            <FontAwesome5Icon
                size={24}
                name='plus-circle'
                onPress={() => NavigationService.navigate('CreateGame',
                    { uid: firebase.auth().currentUser.uid })} />
        </PaddingView>
    ),
    /** a style object that will be applied to the View that wraps the header. 
     *  If you set backgroundColor on it, that will be the color of your header. */
    headerStyle: {
        backgroundColor: '#fff',
    },
    /** the back button and title both use this property as their color. 
     *  In the example below, we set the tint color to white (#fff) so 
     *  the back button and the header title would be white. */
    headerTintColor: '#fff',
    /** if we want to customize the fontFamily, fontWeight and 
     *  other Text style properties for the title, we can use this to do it. */
    headerTitleStyle: {
        fontWeight: 'bold',
    },
};

export default HomePage
