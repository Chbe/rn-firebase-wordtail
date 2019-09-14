import React, { useEffect, useState } from 'react'
import LetterBox from '../components/game/in-game/letter/LetterBox'
import { CenterView, SafeWrapper } from '../components/UI/Containers/Containers'
import Keyboard from '../components/game/in-game/keyboard/Keyboard'
import styled from 'styled-components'
import { View } from 'react-native'
import { GameContext, GameStore, useGameContext } from '../stores/GameStore'
import { Button, Icon, withTheme } from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Wrapper = styled(CenterView)`
    justify-content: space-between;
    flex-direction: column;
    height: 100%;
`

const ActionsWrapper = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
`;

const GamePage = ({ navigation, theme }) => {
    const { state, actions } = GameStore();

    const [id, setId] = useState('');
    const [letters, setLetters] = useState([]);
    useEffect(() => {
        const idParam = navigation.getParam('gameId', '');
        const lettersParam = navigation.getParam('letters', []);
        setId(idParam);
        setLetters(lettersParam);
        if (!lettersParam) {
            actions.enablePlay();
        }
        return () => {

        };
    }, [])
    return (
        <GameContext.Provider value={{ state, actions }}>
            <SafeWrapper bg={theme.colors.lightShade}>
                <Wrapper>
                    {/* TOOD: This shall be a progress bar */}
                    <View style={{ height: 30 }}></View>

                    <LetterBox letters={letters} theme={theme} />
                    <ActionsWrapper>
                        <Button
                            disabled={!state.enablePlay}
                            buttonStyle={{ backgroundColor: theme.colors.success }}
                            icon={
                                <FontAwesome5
                                    name="paper-plane"
                                    size={15}
                                    color={"white"}
                                    style={{ marginRight: 5 }}
                                />
                            }
                            title="Send"
                        />
                        <Button
                            disabled={!state.enablePlay}
                            buttonStyle={{ backgroundColor: theme.colors.warning }}
                            icon={
                                <FontAwesome5
                                    name="gavel"
                                    size={15}
                                    color="white"
                                    style={{ marginRight: 5 }}
                                />
                            }
                            title="Bust"
                        />
                        <Button
                            disabled={!state.enablePlay}
                            buttonStyle={{ backgroundColor: theme.colors.danger }}
                            icon={
                                <FontAwesome5
                                    name='glasses'
                                    size={15}
                                    color="white"
                                    style={{ marginRight: 5 }}
                                />
                            }
                            title="Call"
                        />
                    </ActionsWrapper>
                    <View>
                        <Keyboard />
                    </View>
                </Wrapper>
            </SafeWrapper>
        </GameContext.Provider>
    )
}

export default withTheme(GamePage)
