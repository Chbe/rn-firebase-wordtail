import React from 'react';
import { anonymousLogin } from '../AuthFunctions';
import { LoginButton } from '../../UI/controls/buttons/Buttons';

const AnonymousLogin = ({ navigation }) => {
    const handleLogin = async () => {
        const cred = await anonymousLogin();
        if (cred)
            navigation.navigate('App');
        else
            console.warn('Login fail');
    }
    return (
        <LoginButton
            name="user-secret"
            backgroundColor="#4e4e4e"
            onPress={handleLogin}
        >
            Continue as guest
      </LoginButton>
    )
}

export default AnonymousLogin
