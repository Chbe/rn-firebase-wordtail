import React, { useEffect, useState } from 'react'
import { View, SegmentedControlIOS, FlatList } from 'react-native'
import Logout from '../components/auth/logout/Logout'
import { CenterView, SafeWrapper, PaddingView } from '../components/UI/Containers/Containers'
import firebase from 'react-native-firebase'
import { Avatar, Input, Icon, withTheme } from 'react-native-elements'
import TextField from '../components/UI/controls/inputs//floating/FloatingInput';

const ProfilePage = ({ navigation, theme }) => {
    const [user, setUser] = useState({});
    const [displayNameInputValue, setDisplayNameInputValue] = useState('');
    const [emailInputValue, setEmailInputValue] = useState('');

    const [segmentIndex, setSegmentIndex] = useState(0);

    useEffect(() => {
        const { currentUser } = firebase.auth();
        setUser(currentUser);
        return () => {
            //
        };
    }, [])
    return (
        <SafeWrapper>
            <PaddingView>
                <SegmentedControlIOS
                    values={['Profile', 'App settings']}
                    selectedIndex={segmentIndex}
                    tintColor={theme.colors.primary}
                    onChange={(event) => {
                        setSegmentIndex(event.nativeEvent.selectedSegmentIndex);
                    }}
                />
                {segmentIndex === 0
                    ?
                    <>
                        <CenterView style={{paddingTop: 10}}>
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
                    </>
                    : <>
                        <FlatList

                        />
                    </>
                }
            </PaddingView>
        </SafeWrapper>
    )
}

ProfilePage.navigationOptions = {
    title: 'Profile',
};

export default withTheme(ProfilePage)
