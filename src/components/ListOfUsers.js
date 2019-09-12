import React, { useEffect, useState, useReducer } from 'react'
import firebase from 'react-native-firebase';
import { Avatar, ListItem } from 'react-native-elements';
import { useCreateGameContext } from '../stores/CreateGameStore';
import { FlatList } from 'react-native';

const ListOfUsers = () => {
    const { state, actions } = useCreateGameContext();
    const [friends, setFriendsList] = useState([]);

    const toggleInvite = (user) => {
        let tempInvites = [];
        const exists = userIsInvited(user.uid);
        if (exists) {
            tempInvites = [...state.players].filter(invitedUser => invitedUser.uid !== user.uid);
        } else {
            tempInvites = [...state.players, { ...user, score: 0, isActive: false, accepted: false }]
        }
        actions.setPlayers(tempInvites);
    }

    const userIsInvited = (uid) => {
        return !!state.players.find(invitedUser => invitedUser.uid === uid);
    }

    const getFriends = async (userRef) => {
        const user = await userRef.get();

        if (user.exists) {
            const userData = user.data();
            if (userData.friends) {
                setFriendsList(userData.friends);
            }
        } else {
            console.error('Couldnt get user document');
        }
    }

    useEffect(() => {
        actions.clear();
        const { uid, displayName, email, photoURL } = firebase.auth().currentUser;
        actions.setAdmin(uid);
        actions.setPlayers([{
            uid,
            displayName,
            email,
            photoURL,
            score: 0,
            isActive: false,
            accepted: true
        }]); // Adding current user as one of game players per default

        const userRef = firebase.firestore()
            .collection('users')
            .doc(uid);

        getFriends(userRef);

        return () => {

        };
    }, [])

    const keyExtractor = (item, index) => index.toString();

    const renderItem = ({ item }) => (
        <ListItem
            title={item.displayName}
            subtitle={userIsInvited(item.uid) ? 'Invited' : 'Not invited'}
            leftAvatar={{
                source: item.photoURL && { uri: item.photoURL },
                title: item.displayName[0]
            }}
            bottomDivider
            onPress={() => toggleInvite(item)}
        />
    )


    return (
        <FlatList
            keyExtractor={keyExtractor}
            data={friends}
            renderItem={renderItem}
        />
    )
}

export default ListOfUsers
