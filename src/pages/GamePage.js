import React, { useEffect, useState } from 'react'
import LetterBox from '../components/games/in-game/letter/LetterBox'
import { CenterView, SafeWrapper } from '../components/UI/Containers/Containers'
import Keyboard from '../components/games/in-game/keyboard/Keyboard'
import styled from 'styled-components'
import { View } from 'react-native'
import { Button, Icon, Text } from 'native-base'
import { GameContext, GameStore } from '../stores/GameStore'

const Wrapper = styled(CenterView)`
    justify-content: space-between;
    flex-direction: column;
`

const ActionsWrapper = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
`;

const GamePage = ({ navigation }) => {
    const { state, actions } = GameStore()

    const [id, setId] = useState('');
    const [letters, setLetters] = useState([]);
    useEffect(() => {
        const idParam = navigation.getParam('gameId', '');
        const lettersParam = navigation.getParam('letters', []);
        setId(idParam);
        setLetters(lettersParam);
        return () => {

        };
    }, [])
    return (
        <GameContext.Provider value={{ state, actions }}>
            <SafeWrapper>
                <Wrapper>
                    {/* TOOD: This shall be a progress bar */}
                    <View style={{ height: 30 }}></View>

                    <LetterBox letters={letters} />
                    <ActionsWrapper>
                        <Button iconLeft success>
                            <Icon name='send' />
                            <Text>Send</Text>
                        </Button>
                        <Button iconLeft primary>
                            <Icon name='glasses' />
                            <Text>Bust</Text>
                        </Button>
                        <Button iconLeft warning>
                            <Icon name='eye' />
                            <Text>Call</Text>
                        </Button>
                    </ActionsWrapper>
                    <View>
                        <Keyboard />
                    </View>
                </Wrapper>
            </SafeWrapper>
        </GameContext.Provider>
    )
}

export default GamePage
