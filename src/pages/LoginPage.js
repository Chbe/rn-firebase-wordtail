import React from 'react';
import { CenterView, PaddingView } from '../components/UI/Containers/Containers';
import EmailLogin from '../components/auth/login/EmailLogin';
import FacebookLogin from '../components/auth/login/FacebookLogin';
import AnonymousLogin from '../components/auth/login/AnonymousLogin';

const Login = () => {
    return (
        <CenterView>
            <PaddingView padding={5}>
                <EmailLogin />
            </PaddingView> 
            <PaddingView padding={5}>
                <FacebookLogin />
            </PaddingView>
            <PaddingView padding={5}>
                <AnonymousLogin />
            </PaddingView>
        </CenterView>
    )
}

export default Login
