import React, { useEffect, useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import { Text, Card, Avatar, Image, Input } from 'react-native-elements'
import Logout from '../components/auth/logout/Logout'
import { CenterView } from '../components/UI/Containers/Containers'
import firebase, { RNFirebase } from 'react-native-firebase'

const ProfilePage = ({ navigation }) => {
    const [user, setUser] = useState({});
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    useEffect(() => {
        const { currentUser } = firebase.auth();
        setUser(currentUser);
        setDisplayName(currentUser.displayName);
        setEmail(currentUser.email);
        return () => {
            //
        };
    }, [])
    return (
        <SafeAreaView>
            <Logout navigation={navigation} />
            <View>
                <Card title="title">
                    <View>
                        <Avatar
                            size='large'
                            rounded
                            title={user.displayName && user.displayName[0]}
                            source={user.photoURL
                                ? { uri: user.photoURL }
                                : null}
                            showEditButton
                        />
                        <Input placeholder={displayName} />
                        <Input placeholder={email} />
                    </View>
                </Card>
            </View>
        </SafeAreaView>
    )
}

ProfilePage.navigationOptions = {
    title: 'Profile',
};

export default ProfilePage
