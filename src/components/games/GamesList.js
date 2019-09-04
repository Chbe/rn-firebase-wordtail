import React from 'react';
import { FlatList, Text } from 'react-native';
import { Games } from '../../test/ExampleGames';
import ActiveGameCard from './game-cards/ActiveGameCard';


const renderGameCard = ({ item }) => {
    return <ActiveGameCard game={item} />
}
const GamesList = () => {
    return (
        <FlatList
            data={Games}
            renderItem={renderGameCard}
        />
    )
}

export default GamesList
