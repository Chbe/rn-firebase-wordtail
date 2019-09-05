import React from 'react';
import { facebookLogin } from '../AuthFunctions';
import { LoginButton } from '../../UI/controls/buttons/Buttons';

const FacebookLogin = ({ navigation }) => {
    const handleLogin = async () => {
        const cred = await facebookLogin();
        if (cred)
            navigation.navigate('App');
        else
            console.warn('Login fail');
    }
    return (
        <LoginButton
            name="facebook"
            backgroundColor="#3b5998"
            onPress={handleLogin}
        >
            Continue with Facebook
      </LoginButton>
    )
}

export default FacebookLogin
