import React from 'react';
import { Button } from 'react-native';
import { logout } from '../AuthFunctions';

const Logout = () => {
    return (
        <Button title="Sign out" accessibilityLabel="Sign out" onPress={logout} />
    )
}

export default Logout
