import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Logout from '../components/auth/logout/Logout'
import { CenterView, SafeWrapper, PaddingView } from '../components/UI/Containers/Containers'
import firebase from 'react-native-firebase'
import { Avatar, Input, Icon, withTheme } from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';

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
        <SafeWrapper>
            <Logout navigation={navigation} />
            <PaddingView>
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
                </View>
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
            </PaddingView>
        </SafeWrapper>
    )
}

ProfilePage.navigationOptions = {
    title: 'Profile',
};

export default withTheme(ProfilePage)
