import React from 'react'
import styled from 'styled-components'
import { View } from 'react-native';

const KeyContainer = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    height: 35;
    width: 35;
    margin: 1px;
`;

const KeyText = styled.Text`
    font-size: 30;
`;

const keypress = (key) => {
    console.log('Pressed', key);
}

const Key = ({ name }) => {
    return (
        <KeyContainer onPress={() => keypress(name)}>
            <KeyText>{name}</KeyText>
        </KeyContainer>
    )
}

export default Key
