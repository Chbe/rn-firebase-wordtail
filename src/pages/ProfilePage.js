import React, { useEffect, useState } from 'react'
import { SafeAreaView, View } from 'react-native'
// import { Text, Card, Avatar, Image, Input } from 'react-native-elements'
import Logout from '../components/auth/logout/Logout'
import { CenterView } from '../components/UI/Containers/Containers'
import firebase, { RNFirebase } from 'react-native-firebase'
import { Content, Form, Item, Input, Label, Container } from 'native-base'
import { Avatar } from 'react-native-elements'

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
        <SafeAreaView style={{ flex: 1 }}>
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
                            <Label>{displayName}</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel last>
                            <Label>{email}</Label>
                            <Input />
                        </Item>
                    </Form>
                </Content>
            </Container>
        </SafeAreaView>
    )
}

ProfilePage.navigationOptions = {
    title: 'Profile',
};

export default ProfilePage
