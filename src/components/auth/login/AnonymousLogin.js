import React from 'react';
import { Button } from 'react-native';
import { anonymousLogin } from '../AuthFunctions';

const AnonymousLogin = () => {
    return (
        <Button
            title="Login as guest"
            onPress={anonymousLogin}
            accessibilityLabel="Click here to login as a guest" />
    )
}

export default AnonymousLogin
