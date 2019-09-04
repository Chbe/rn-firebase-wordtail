import React from 'react';
import { facebookLogin } from '../AuthFunctions';

import Icon from 'react-native-vector-icons/FontAwesome5';

const FacebookLogin = () => {
    return (
        <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
            onPress={facebookLogin}
        >
            Login with Facebook
      </Icon.Button>
    )
}

export default FacebookLogin
