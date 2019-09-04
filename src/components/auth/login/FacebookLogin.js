import React from 'react';
import { Button } from 'react-native';
import { facebookLogin } from '../AuthFunctions';



const FacebookLogin = () => {
    return (
        <Button color="#3b5998" title="Login with Facebook" onPress={facebookLogin} />
    )
}

export default FacebookLogin
