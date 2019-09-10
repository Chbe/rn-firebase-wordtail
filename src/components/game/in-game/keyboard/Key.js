import React from 'react'
import styled from 'styled-components'
import { View } from 'react-native';
import { useGameContext } from '../../../../stores/GameStore'

const KeyContainer = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    height: 35;
    width: 35;
    margin: 1px;
`;

const KeyText = styled.Text`
    font-size: 30;
    color: ${({ enablePlay }) => (enablePlay ? 'black' : 'grey')}
`;

const Key = ({ name }) => {
    const { state, actions } = useGameContext();
    return (
        <KeyContainer disabled={!state.enablePlay} onPress={() => {
            state.enablePlay && actions.setLetter(name)
        }}>
            <KeyText enablePlay={state.enablePlay}>{name}</KeyText>
        </KeyContainer>
    )
}

export default Key
