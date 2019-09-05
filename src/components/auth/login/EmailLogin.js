import React from 'react';
import { emailLogin } from '../AuthFunctions';
import { LoginButton } from '../../UI/controls/buttons/Buttons';

const EmailLogin = ({ navigation }) => {
    const handleLogin = async (email, password) => {
        const cred = await emailLogin(email, password);
        if (cred)
            navigation.navigate('App');
        else
            console.warn('Login fail');
    }
    return (
        <LoginButton
            name="envelope"
            backgroundColor="#ff8c0f"
            accessibilityLabel="Click here to login with email"
            onPress={(ev) => {
                ev.preventDefault();
                handleLogin("test@test.se", "123456789");
            }}
        >
            Login with email
      </LoginButton>
    )
}

export default EmailLogin
