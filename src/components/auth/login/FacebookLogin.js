import React from 'react';
import { facebookLogin } from '../AuthFunctions';
import { LoginButton } from '../../UI/controls/buttons/Buttons';

const FacebookLogin = () => {
    return (
        <LoginButton
            name="facebook"
            backgroundColor="#3b5998"
            onPress={facebookLogin}
        >
            Continue with Facebook
      </LoginButton>
    )
}

export default FacebookLogin
