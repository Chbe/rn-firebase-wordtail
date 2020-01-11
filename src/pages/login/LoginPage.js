import React from 'react';
import { CenterView, PaddingView, SafeWrapper } from '../../components/UI/Containers/Containers';
import EmailLogin from '../../components/auth/login/EmailLogin';
import FacebookLogin from '../../components/auth/login/FacebookLogin';
import AnonymousLogin from '../../components/auth/login/AnonymousLogin';
import { withTheme, Text } from 'react-native-elements';

const Login = ({ navigation, theme }) => {
    return (
        <SafeWrapper bg={theme.colors.lightShade}>
            <CenterView style={{ height: '100%', width: '100%' }}>
                <Text>TODO: Regular email/password login</Text>
                {/* <PaddingView padding={5}>
                    <EmailLogin navigation={navigation} />
                </PaddingView> */}
                <PaddingView padding={5}>
                    <FacebookLogin navigation={navigation} />
                </PaddingView>
                <PaddingView padding={5}>
                    <AnonymousLogin navigation={navigation} />
                </PaddingView>
            </CenterView>
        </SafeWrapper>
    )
}

export default withTheme(Login)
