import React from 'react';
import { Card, Text, Avatar, Button, Icon } from 'react-native-elements';
const appendZero = (value) => {
    return value < 10 ? `0${value}` : value;
}

const formatDate = (date) => {
    const current_datetime = new Date(date);
    const formatted_date =
        `${current_datetime.getFullYear()}-${appendZero((current_datetime.getMonth() + 1))}-${appendZero(current_datetime.getDate())} ${current_datetime.getHours()}:${current_datetime.getMinutes()}`
    return formatted_date;
}
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
const FinishedGameCard = ({ game }) => {
    const photoURL = game.status === 'active'
        && game.players.find(p => p.uid === game.activePlayer).photoURL;
    return (
        <Card
            title={game.title}>
            <Avatar
                rounded
                title="🥇"
            />
            <Text style={{ marginBottom: 10 }}>
                {formatDate(game.lastUpdated)}
            </Text>
            <Button
                icon={<Icon name='code' color='#ffffff' />}
                backgroundColor='#03A9F4'
                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                title='VIEW NOW' />
        </Card>
    )
}

export default FinishedGameCard
