import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { Text } from 'react-native-elements'
import Logout from '../components/auth/logout/Logout'

const ProfilePage = ({ navigation }) => {
    const [user, setUser] = useState({});
    useEffect(() => {
        const { uid } = navigation.state.params;
        return () => {
            //
        };
    }, [])
    return (
        <SafeAreaView>
            <Logout navigation={navigation} />
            <Text>Hello ProfilePage, {user.uid}</Text>
        </SafeAreaView>
    )
}

ProfilePage.navigationOptions = {
    title: 'Profile',
  };

export default ProfilePage
