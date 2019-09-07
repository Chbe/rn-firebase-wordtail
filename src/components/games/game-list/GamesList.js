import React, { useEffect, useState } from 'react';
import { SectionList } from 'react-native';
import firebase from 'react-native-firebase';
import { ListItem } from 'react-native-elements';
import SectionHeader from './SectionHeader';
import SectionSubtitle from './SectionSubtitle';

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
        const uid = firebase.auth().currentUser.uid;
        const ref = firebase.firestore().collection('games')
            .where('playersUid',
                'array-contains',
                uid)
            .orderBy('status', 'asc')
            .orderBy('lastUpdated', 'desc')
            .limit(5);
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

    return (
        <SectionList
            sections={[
                { type: 'invite', data: invites() },
                { type: 'active', data: active() },
                { type: 'finished', data: finished() }
            ]}
            renderItem={({ item }) => <ListItem
                title={item.title}
                subtitle={<SectionSubtitle item={item} />}
                bottomDivider
                chevron
                leftAvatar={{
                    source: item.status === 'active'
                        ? { uri: item.players.find(p => p.uid === item.activePlayer).photoURL }
                        : null,
                    title: item.title[0]
                }}
            />}
            renderSectionHeader={({ section }) => (section.data.length
                ? <SectionHeader section={section} />
                : null)}
            keyExtractor={(item, index) => index}
        />
    )
}

export default GamesList
