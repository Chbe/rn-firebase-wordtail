import React from 'react';
import { View, Text } from 'react-native';

const ActiveGameCard = ({ game }) => {
    return (
        <View>
            <Text>{game.title}</Text>
        </View>
    )
}

export default ActiveGameCard
