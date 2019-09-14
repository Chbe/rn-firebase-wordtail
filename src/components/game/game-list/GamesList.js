import React, { useEffect, useState } from 'react';
import { SectionList } from 'react-native';
import firebase from 'react-native-firebase';
import { ListItem, Button, withTheme } from 'react-native-elements';
import SectionHeader from './SectionHeader';
import SectionSubtitle from './SectionSubtitle';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const GamesList = ({ navigation, uid, theme }) => {
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
            .orderBy('lastUpdated', 'desc');
        // .limit(5);
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

    const goToGame = (item) => {
        if (item.status === 'active' && item.activePlayer === uid) {
            navigation.navigate('Game', {
                gameId: item.key,
                letters: item.letters
            });
        }
    }

    const renderSections = () => {
        let sections = [];
        const invitesArr = invites();
        const activeArr = active();
        const finishedArr = finished();

        if (invitesArr.length) {
            sections.push({ type: 'invite', data: invitesArr });
        }
        if (activeArr.length) {
            sections.push({ type: 'active', data: activeArr });
        }
        if (finishedArr.length) {
            sections.push({ type: 'finished', data: finishedArr });
        }

        return sections;
    }

    return (
        <SectionList
            sections={renderSections()}
            renderItem={({ item }) => <ListItem
                title={item.title}
                subtitle={<SectionSubtitle item={item} />}
                bottomDivider
                chevron={
                    <FontAwesome5Icon
                        name="arrow-right"
                        size={15}
                        color={theme.colors.accent}
                    />}
                leftAvatar={{
                    source: item.status === 'active'
                        ? { uri: item.players.find(p => p.uid === item.activePlayer).photoURL }
                        : null,
                    title: item.title[0]
                }}
                onPress={(ev) => {
                    // TODO: save game state so game page can
                    goToGame(item);
                }}
            />}
            renderSectionHeader={({ section }) => (section.data.length
                ? <SectionHeader section={section} />
                : null)}
            keyExtractor={(item, index) => index}
        />
    )
}

export default withTheme(GamesList)
