import React from 'react';
import { emailLogin } from '../AuthFunctions';
import { LoginButton } from '../../UI/controls/buttons/Buttons';

const EmailLogin = () => {
    return (
        <LoginButton
            name="envelope"
            backgroundColor="#ff8c0f"
            accessibilityLabel="Click here to login with email"
            onPress={(ev) => {
                ev.preventDefault();
                emailLogin("test@test.se", "123456789");
            }}
        >
            Login with email
      </LoginButton>
    )
}

export default EmailLogin
