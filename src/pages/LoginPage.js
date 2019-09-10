import React from 'react';
import { CenterView, PaddingView, SafeWrapper } from '../components/UI/Containers/Containers';
import EmailLogin from '../components/auth/login/EmailLogin';
import FacebookLogin from '../components/auth/login/FacebookLogin';
import AnonymousLogin from '../components/auth/login/AnonymousLogin';

const Login = ({ navigation }) => {
    return (
        <SafeWrapper>
            <CenterView>
                <PaddingView padding={5}>
                    <EmailLogin navigation={navigation} />
                </PaddingView>
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

export default Login
