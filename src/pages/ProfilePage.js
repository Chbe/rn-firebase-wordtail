import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
// import { Text, Card, Avatar, Image, Input } from 'react-native-elements'
import Logout from '../components/auth/logout/Logout'
import { CenterView, SafeWrapper } from '../components/UI/Containers/Containers'
import firebase, { RNFirebase } from 'react-native-firebase'
import { Content, Form, Item, Input, Label, Container } from 'native-base'
import { Avatar } from 'react-native-elements'

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
        <SafeWrapper style={{ flex: 1 }}>
            <Container>
                <Logout navigation={navigation} />
                <Content>
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
                    <Form>
                        <Item floatingLabel>
                            <Label>{user.displayName}</Label>
                            <Input value={displayNameInput} onEndEditing={(ev) => {
                                manageDisplayName(ev.nativeEvent.text);
                            }}
                            // onFocus={() => {
                            //     if (displayName !== user.displayName)
                            //         setDisplayNameInput(displayName)
                            // }} 
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label>{email}</Label>
                            <Input />
                        </Item>
                    </Form>
                </Content>
            </Container>
        </SafeWrapper>
    )
}

ProfilePage.navigationOptions = {
    title: 'Profile',
};

export default ProfilePage
