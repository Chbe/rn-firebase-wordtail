import React from 'react';
import { Card, Text, Avatar, Button, Icon } from 'react-native-elements';
const getAvatar = (photoURL, title) => {
    return photoURL
        ? <Avatar
            rounded
            source={{
                uri: photoURL
            }
            }
        />
        :
        <Avatar
            rounded
            title={title[0]}
        />
}
const ActiveGameCard = ({ game }) => {
    const photoURL = game.status === 'active'
        && game.players.find(p => p.uid === game.activePlayer).photoURL;
    return (
        <Card
            title={game.title}>
            {getAvatar(photoURL, game.title)}
            <Text style={{ marginBottom: 10 }}>
                The idea with React Native Elements is more about component structure than actual design.
            </Text>
            <Button
                icon={<Icon name='code' color='#ffffff' />}
                backgroundColor='#03A9F4'
                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                title='VIEW NOW' />
        </Card>
    )
}

export default ActiveGameCard
