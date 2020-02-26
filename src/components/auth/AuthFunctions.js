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
    updateUserData(firebaseUserCredential.user, true);
    return firebaseUserCredential;
}

const checkIfUserExists = async (uid) => {
    const user = await firebase.firestore().collection('users')
        .doc(uid)
        .get();
    return user.exists ? true : false;
}

const generateFromNameOrEmail = async (nameOrEmail, generateFromEmail = false) => {
    let username = generateFromEmail
        ? generateUsernameFromEmail(nameOrEmail)
        : generateUsernameFromDisplayname(nameOrEmail);

    const takenUsername = await controlUsername(username);
    if (takenUsername) {
        /** Get number end of string */
        const matches = takenUsername.match(/\d+$/);
        if (matches) {
            username += (+matches[0] + 1);
        } else {
            username += 1;
        }
    }
    return username;
}

const generateUsernameFromEmail = (email) => {
    return email.match(/^([^@]*)@/)[1].toLowerCase();
}

const generateUsernameFromDisplayname = (displayName) => {
    const displayNameArray = displayName.split(' ');
    let username = '';
    if (displayNameArray.length === 1) {
        /** E.g. john */
        username = `${displayNameArray[0]}`
            .toLowerCase();
    } else if (displayNameArray.length === 2) {
        /** E.g. johndoe */
        username = `${displayNameArray[0]}${displayNameArray[1]}`
            .toLowerCase();
    } else if (displayNameArray.length > 2) {
        /** E.g. johnsdoe */
        username = `${displayNameArray[0]}${displayNameArray[1].substring(0, 1)}${displayNameArray[2]}`
            .toLowerCase();
    } else {

    }
    return username;
}

const controlUsername = async (username) => {
    const snapshot = await firebase.firestore().collection('users')
        .where('username', '>=', username)
        .orderBy('username', 'DESC')
        .limit(1)
        .get();
    console.log(snapshot)
    if (snapshot.docs.length > 0) {
        return snapshot.docs[0].data().username;
    }
    return null;
}

const updateUserData = async (userData, generateFromEmail = false) => {
    const userExist = await checkIfUserExists(userData.uid);
    console.log('usersexists', userExist)
    if (!userExist) {
        const { displayName, email, photoURL, uid } = userData;
        const username = await generateFromNameOrEmail(displayName, generateFromEmail);
        firebase.firestore().collection('users').doc(uid).set({
            displayName, email, photoURL, uid, username
        }, { merge: true });
    }
}