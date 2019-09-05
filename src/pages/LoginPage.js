import React from 'react';
import { CenterView, PaddingView } from '../components/UI/Containers/Containers';
import EmailLogin from '../components/auth/login/EmailLogin';
import FacebookLogin from '../components/auth/login/FacebookLogin';
import AnonymousLogin from '../components/auth/login/AnonymousLogin';

const Login = ({ navigation }) => {
    return (
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
    )
}

export default Login
