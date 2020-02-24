import React, { useEffect, useState } from 'react'
import { Input } from 'react-native-elements'
import { useGameContext } from '../../../../stores/GameStore';


const WordInput = ({ letters = '' }) => {
    const { actions } = useGameContext();
    return (
        <Input
            placeholder={`${letters.join('')}...`}
            onChangeText={text => actions.setCompleteWord(text.toUpperCase())}
        />
    )
}

export default WordInput
