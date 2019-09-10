import React from 'react';
import Key from './Key';
import styled from 'styled-components'
import { View } from 'react-native';

const Row = styled.View`
    flex-direction: row;
    justify-content: center;    
    align-items: center;
`;

const lettersArr = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

const Keyboard = () => {
    return (
        <View>
            {lettersArr.map((row, i) => {
                return <Row key={i}>
                    {row.map(key => {
                        return <Key key={key} name={key} />
                    })}
                </Row>
            })}
        </View>
    )
}

export default Keyboard
