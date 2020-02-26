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
            console.warn('User cancelled request');
            return null;
        }

        // get the access token
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            // handle this however suites the flow of your app
            console.error('Something went wrong obtaining the users access token');
            return null;
        }

        // create a new firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

        // login with credential
        const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
        updateUserData(firebaseUserCredential.user);


        return firebaseUserCredential;
    } catch (e) {
        console.error(e);
    }
}

export const anonymousLogin = async () => {
    const firebaseUserCredential = await firebase.auth().signInAnonymously();
    return firebaseUserCredential;
}

export const emailLogin = async (email, password) => {
    const firebaseUserCredential = firebase.auth().signInWithEmailAndPassword(email, password);
    return firebaseUserCredential;
}

const updateUserData = (userData) => {
    const { displayName, email, photoURL, uid } = userData;
    const searchDisplayName = displayName.toLowerCase(); 
    // TODO: unique displaynames
    firebase.firestore().collection('users').doc(uid).set({
        displayName, email, photoURL, uid, searchDisplayName
    }, { merge: true });
}