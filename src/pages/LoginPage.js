import React from 'react';
import { CenterView } from '../components/UI/Containers/Containers';
import EmailLogin from '../components/auth/login/EmailLogin';
import FacebookLogin from '../components/auth/login/FacebookLogin';
import AnonymousLogin from '../components/auth/login/AnonymousLogin';

const Login = () => {
    return (
        <CenterView>
            <EmailLogin />
            <FacebookLogin />
            <AnonymousLogin />
        </CenterView>
    )
}

export default Login
