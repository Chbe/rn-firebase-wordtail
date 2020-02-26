import React, { useEffect, useState, useReducer } from 'react'
import { Avatar, ListItem } from 'react-native-elements';
import { useCreateGameContext } from '../../stores/CreateGameStore';
import { FlatList } from 'react-native';
import firebase from 'react-native-firebase';

const ListOfUsers = ({ users = [], userSearch }) => {
    const { state, actions } = useCreateGameContext();
    const [friends, setFriendsList] = useState([]);
    const [adminPlayer, setAdminPLayer] = useState({});

    const inviteOrAdd = (user) => {
        userSearch ? addToFriendsList(user) : toggleInvite(user);
    }

    const formatFriendsList = () => {
        return friends.map(({
            uid,
            displayName,
            photoURL
        }) => { return { uid, displayName, photoURL } });
    }

    const addToFriendsList = async ({ displayName, uid, photoURL }) => {
        if (!friends.find(f => f.uid === uid)) {
            const currentUserUid = firebase.auth().currentUser.uid;
            const userRef = firebase.firestore()
                .collection('users')
                .doc(currentUserUid);

            const newFriend = { uid, displayName, photoURL };
            const currentFriendsList = formatFriendsList();

            await userRef.set({
                friends: [
                    ...currentFriendsList,
                    newFriend
                ]
            }, { merge: true });
        }
    }

    const toggleInvite = (user) => {
        let invited;
        const exists = userIsInvited(user.uid);
        if (exists) {
            invited = false;
        } else {
            invited = true;
        }
        const newFriendsList = friends.map(friend => ({ ...friend, invited }));
        setFriendsList(newFriendsList);
        actions.setPlayers([...newFriendsList.filter(friend => friend.invited), adminPlayer]);
    }

    const userIsInvited = (uid) => {
        return !!friends.find(invitedUser => invitedUser.uid === uid && invitedUser.invited);
    }

    const getFriends = async (querySnapshot) => {
        const userFriends = querySnapshot.data().friends;
        if (userFriends) {
            setFriendsList(userFriends.map(friend => ({
                ...friend,
                invited: false,
                score: 0,
                isActive: false,
                accepted: false
            })));
        }
    }

    const getFriendSubtitle = () => {
        return friends.find(f => f.uid === firebase.auth().currentUser.uid)
            ? 'Already friends'
            : 'Add friend';
    }

    useEffect(() => {
        let sub;
        actions.clear();
        const { uid, displayName, email, photoURL } = firebase.auth().currentUser;
        actions.setAdmin(uid);
        setAdminPLayer({
            uid,
            displayName,
            email,
            photoURL,
            score: 0,
            isActive: false,
            accepted: true
        });

        const userRef = firebase.firestore()
            .collection('users')
            .doc(uid);

        sub = userRef.onSnapshot(getFriends)

        return () => {
            if (sub)
                sub();
        };
    }, [])

    const keyExtractor = (item, index) => index.toString();

    const renderItem = ({ item }) => (
        <ListItem
            title={item.displayName}
            subtitle={userSearch ? getFriendSubtitle()
                : userIsInvited(item.uid) ? 'Invited' : 'Not invited'}
            leftAvatar={{
                source: item.photoURL && { uri: item.photoURL },
                title: item.displayName[0]
            }}
            bottomDivider
            onPress={() => inviteOrAdd(item)}
        />
    )


    return (
        <FlatList
            keyExtractor={keyExtractor}
            data={userSearch ? users : friends}
            renderItem={renderItem}
        />
    )
}

export default ListOfUsers