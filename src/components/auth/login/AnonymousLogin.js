import React from 'react';
import { anonymousLogin } from '../AuthFunctions';
import { LoginButton } from '../../UI/controls/buttons/Buttons';

const AnonymousLogin = () => {
    return (
        <LoginButton
            name="user-secret"
            backgroundColor="#4e4e4e"
            onPress={anonymousLogin}
        >
            Continue as guest
      </LoginButton>
    )
}

export default AnonymousLogin
