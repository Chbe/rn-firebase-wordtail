import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { Text } from 'react-native-elements'

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
            <Text>Hello ProfilePage, {user.uid}</Text>
        </SafeAreaView>
    )
}

export default ProfilePage
