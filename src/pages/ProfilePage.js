import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Logout from '../components/auth/logout/Logout'
import { CenterView, PaddingView } from '../components/UI/Containers/Containers'
import firebase from 'react-native-firebase'
import { Avatar, withTheme } from 'react-native-elements'
import TextField from '../components/UI/controls/inputs//floating/FloatingInput';


const ProfilePage = ({ navigation, theme }) => {
    const [user, setUser] = useState({});
    const [displayNameInputValue, setDisplayNameInputValue] = useState('');
    const [emailInputValue, setEmailInputValue] = useState('');

    useEffect(() => {
        const { currentUser } = firebase.auth();
        setUser(currentUser);
        return () => {
            //
        };
    }, [])
    return (
        <View>
            <CenterView style={{ paddingTop: 10 }}>
                <Avatar
                    size='large'
                    rounded
                    title={user.displayName && user.displayName[0]}
                    source={user.photoURL
                        ? { uri: user.photoURL }
                        : null}
                    showEditButton
                />
            </CenterView>
            <PaddingView style={{
                margin: 10,
                borderRadius: 10
            }}>
                <TextField
                    baseColor={theme.colors.lightAccent}
                    tintColor={theme.colors.lightAccent}
                    label={user.displayName ? user.displayName : 'Anonymous Name'}
                    value={displayNameInputValue}
                    onChangeText={(name) => setDisplayNameInputValue(name)}
                />
                <TextField
                    baseColor={theme.colors.lightAccent}
                    tintColor={theme.colors.lightAccent}
                    label={user.email ? user.email : 'Anonymous Email'}
                    value={emailInputValue}
                    onChangeText={(email) => setEmailInputValue(email)}
                />
            </PaddingView>
            <Logout navigation={navigation} />
        </View>
    )
}

ProfilePage.navigationOptions = {
    title: 'Profile',
};

export default withTheme(ProfilePage)
