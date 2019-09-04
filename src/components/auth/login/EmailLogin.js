import React from 'react';
import { Button } from 'react-native';
import { emailLogin } from '../AuthFunctions';

const EmailLogin = () => {
    return (
        <Button
            title="Login with email"
            onPress={(ev) => {
                ev.preventDefault();
                emailLogin("test@test.se", "123456789");
            }}
            accessibilityLabel="Click here to login with email" />
    )
}

export default EmailLogin
