import React from 'react';
import { CenterView } from '../components/UI/Containers/Containers';
import { Button } from 'react-native';
import firebase from 'react-native-firebase';

const email = "test@test.se";
const password = "123456789";

const login = async () => {
    const cred = await firebase.auth().signInWithEmailAndPassword(email, password);
}

const Login = () => {
    return (
        <CenterView>
            <Button
                title="Login"
                onPress={login}
                accessibilityLabel="Click here to login" />
        </CenterView>
    )
}

export default Login
