import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Logout from '../components/auth/logout/Logout'
import { CenterView } from '../components/UI/Containers/Containers'
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
            <View>
                <TextField
                    tintColor={theme.colors.primary}
                    label={user.displayName ? user.displayName : 'Anonymous Name'}
                    value={displayNameInputValue}
                    onChangeText={(name) => setDisplayNameInputValue(name)}
                />
                <TextField
                    tintColor={theme.colors.primary}
                    label={user.email ? user.email : 'Anonymous Email'}
                    value={emailInputValue}
                    onChangeText={(email) => setEmailInputValue(email)}
                />
            </View>
            <Logout navigation={navigation} />
        </View>
    )
}

ProfilePage.navigationOptions = {
    title: 'Profile',
};

export default withTheme(ProfilePage)
