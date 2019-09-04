import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { Games } from '../../test/ExampleGames';
import ActiveGameCard from './game-cards/ActiveGameCard';


const renderGameCard = ({ item }) => {
    return <ActiveGameCard game={item} />
}
const GamesList = ({ uid }) => {


    // Games.filter(game => game.status !== 'completed'
    //             && game.players.find(p =>
    //                 p.uid === userUid && p.accepted === true))
    return (
        <FlatList
            data={Games}
            renderItem={renderGameCard}
        />
    )
}

export default GamesList
