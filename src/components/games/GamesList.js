import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import ActiveGameCard from './game-cards/ActiveGameCard';
import firebase from 'react-native-firebase';




const renderGameCard = ({ item }) => {
    return <ActiveGameCard game={item} />
}
const GamesList = ({ uid }) => {
    const [games, setGames] = useState([]);

    const onCollectionUpdate = (querySnapshot) => {
        const todos = [];
        querySnapshot.forEach((doc) => {
            const game = doc.data();

            todos.push({
                key: doc.id,
                ...game
            });
        });
        setGames(todos);
    }
    useEffect(() => {
        const ref = firebase.firestore().collection('games');

        const sub = ref.onSnapshot(onCollectionUpdate)
        return () => {
            sub();
        };
    }, [])


    // Games.filter(game => game.status !== 'completed'
    //             && game.players.find(p =>
    //                 p.uid === userUid && p.accepted === true))
    return (
        <FlatList
            data={games}
            renderItem={renderGameCard}
        />
    )
}

export default GamesList
