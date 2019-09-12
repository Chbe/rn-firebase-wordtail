import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Logout from '../components/auth/logout/Logout'
import { CenterView, SafeWrapper, PaddingView } from '../components/UI/Containers/Containers'
import firebase from 'react-native-firebase'
import { Avatar, Input, Icon } from 'react-native-elements'

const ProfilePage = ({ navigation }) => {
    const [user, setUser] = useState({});

    const [displayName, setDisplayName] = useState(null);
    const [displayNameInput, setDisplayNameInput] = useState(null);
    const manageDisplayName = (val) => {
        if (!!val) {
        } else {
            setDisplayName(user.displayName);
        }
    }

    const [email, setEmail] = useState(null);
    const [emailInput, setEmailInput] = useState(null);
    const manageEmail = (val) => {
        if (!!val) {
            setEmail(val);
        } else {
            setEmail(user.email);
        }
        setEmailInput(null);
    }
    useEffect(() => {
        const { currentUser } = firebase.auth();
        setUser(currentUser);
        setDisplayName(currentUser.isAnonymous ?
            'Mysterious User' :
            currentUser.displayName);
        setEmail(currentUser.isAnonymous ?
            'Mysterious Email' :
            currentUser.email)
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
                    <Input
                        placeholder={displayName}
                        onEndEditing={(ev) => {
                            manageDisplayName(ev.nativeEvent.text);
                        }}
                        leftIcon={
                            <Icon
                                type='font-awesome'
                                name='user'
                                size={24}
                                color='black'
                            />
                        }
                    />
                    <Input
                        placeholder={email}
                        leftIcon={
                            <Icon
                                type='font-awesome'
                                name='envelope'
                                size={24}
                                color='black'
                            />
                        }
                    />
                </View>
            </PaddingView>
        </SafeWrapper>
    )
}

ProfilePage.navigationOptions = {
    title: 'Profile',
};

export default ProfilePage
