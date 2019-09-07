import React, { useEffect, useState } from 'react'
import { Container, Content, Text } from 'native-base'

const GamePage = ({ navigation }) => {
    const [game, setGame] = useState({});
    useEffect(() => {
        setGame(navigation.getParam('game'));
        return () => {
            //
        };
    }, [])
    return (
        <Container>
            <Content>
                <Text>{game.title}</Text>
            </Content>
        </Container>
    )
}

export default GamePage
