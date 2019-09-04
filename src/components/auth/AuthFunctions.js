import firebase from 'react-native-firebase';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

export const logout = () => {
    firebase.auth().signOut();
}

// Calling the following function will open the FB login dialogue:
export const facebookLogin = async () => {
    try {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            // handle this however suites the flow of your app
            throw new Error('User cancelled request');
        }

        console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

        // get the access token
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            // handle this however suites the flow of your app
            throw new Error('Something went wrong obtaining the users access token');
        }

        // create a new firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

        // login with credential
        firebase.auth().signInWithCredential(credential);
        // const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

        // console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()))
    } catch (e) {
        console.error(e);
    }
}

export const anonymousLogin = async () => {
    firebase.auth().signInAnonymously();
}

export const emailLogin = async (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password);
}