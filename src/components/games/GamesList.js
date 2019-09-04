import React, { useEffect, useState } from 'react';
import { FlatList, Text, SectionList } from 'react-native';
import ActiveGameCard from './game-cards/ActiveGameCard';
import firebase from 'react-native-firebase';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo
import { ListItem } from 'react-native-elements';

const renderInviteCard = ({ item }) => {
    return <ActiveGameCard game={item} />
}
const renderActiveGameCard = ({ item }) => {
    return <ActiveGameCard game={item} />
}
const renderFinishedCard = ({ item }) => {
    return <ActiveGameCard game={item} />
}

const GamesList = ({ uid }) => {
    const [games, setGames] = useState([]);
    const [loading, setIsLoading] = useState(true);

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
        setIsLoading(false);
    }
    useEffect(() => {
        const ref = firebase.firestore().collection('games')
        const sub = ref.onSnapshot(onCollectionUpdate)
        return () => {
            sub();
        };
    }, [uid])

    const invites = () => {
        return games.filter(game => game.status !== 'completed'
            && game.players.find(p =>
                p.uid === uid && p.accepted === false));
    }
    const active = () => {
        return games.filter(game => game.status !== 'completed'
            && game.players.find(p =>
                p.uid === uid && p.accepted === true));
    }
    const finished = () => {
        return games.filter(game => game.status === 'completed');
    }

    const getAvatar = (game) => {
        return game.status === 'active'
            ? game.players.find(p => p.uid === game.activePlayer).photoURL
            : game.title[0]
    }

    return (
        !loading && <SectionList
            sections={[
                { title: 'Invites', data: invites() },
                { title: 'Active', data: active() },
                { title: 'Finished', data: finished() }
            ]}
            renderItem={({ item }) => <ListItem
                title={item.title}
                subtitle={item.status}
                leftAvatar={{
                    source: item.status === 'active' && { uri: item.players.find(p => p.uid === item.activePlayer).photoURL },
                    title: item.title[0]
                }}
            />}
            renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
            keyExtractor={(item, index) => index}
        />
    )
}

export default GamesList
