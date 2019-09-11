import React, { useEffect, useState, useReducer } from 'react'
import firebase from 'react-native-firebase';
import { Avatar } from 'react-native-elements';
import { useCreateGameContext } from '../stores/CreateGameStore';
import { List, ListItem, Left, Body, Right, Button, Text } from 'native-base';

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

    return (
        <List>
            {friends.map(user =>
                <ListItem key={keyExtractor} thumbnail>
                    <Left>
                        <Avatar rounded
                            source={user.photoURL ? {
                                uri: user.photoURL
                            }
                                : null}
                            title={user.photoURL ? null : user.displayName[0]} />
                    </Left>
                    <Body>
                        <Text>{user.displayName}</Text>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => toggleInvite(user)}>
                            <Text>{userIsInvited(user.uid) ? 'Invited' : 'Not invited'}</Text>
                        </Button>
                    </Right>
                </ListItem>)}
        </List>
    )
}

export default ListOfUsers
