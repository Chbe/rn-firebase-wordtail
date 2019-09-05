import React from 'react';
import { Button } from 'react-native';
import { logout } from '../AuthFunctions';

const Logout = ({ navigation }) => {
    const handleLogout = () => {
        logout();
        navigation.navigate('Auth');
    }
    return (
        <Button
            title="Sign out"
            accessibilityLabel="Sign out"
            onPress={handleLogout} />
    )
}

export default Logout
