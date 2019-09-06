import React, { useEffect, useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import { Text, Card, Avatar, Image } from 'react-native-elements'
import Logout from '../components/auth/logout/Logout'
import { CenterView } from '../components/UI/Containers/Containers'

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
            <View>
                <Card title="title">
                    <View>
                        <Avatar
                            source={{
                                uri:
                                    'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                            }}
                            showEditButton
                        />
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
