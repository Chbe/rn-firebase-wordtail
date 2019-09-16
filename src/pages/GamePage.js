import React, { useEffect, useState } from 'react'
import LetterBox from '../components/game/in-game/letter/LetterBox'
import { CenterView, SafeWrapper } from '../components/UI/Containers/Containers'
import Keyboard from '../components/game/in-game/keyboard/Keyboard'
import styled from 'styled-components'
import { View } from 'react-native'
import { GameContext, GameStore, useGameContext } from '../stores/GameStore'
import { Button, Icon, withTheme } from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProgressBar from '../components/game/in-game/progress-bar/ProgressBar'
import firebase from 'react-native-firebase'

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
    const time = 25000;
    const [game, setGame] = useState({});

    const firestoreRef = firebase.firestore()
        .collection('games')
        .doc(game.key);

    const handleActionBtns = (type) => {
        actions.disablePlay();
        if (type === 1) {
            // Send

        } else if (type === 2) {
            // Bust

        } else {
            // Call

        }
    }

    const firestoreUpdate = async (dataObj) => {
        await firestoreRef.update(dataObj);
    }

    const firestoreSet = async (dataObj) => {
        await firestoreRef.set(dataObj);
    }

    useEffect(() => {
        const gameParam = navigation.getParam('game', {});
        setGame(gameParam);
        if (!gameParam.letters) {
            actions.enablePlay();
        }
        return () => {

        };
    }, [])

    useEffect(() => {
        actions.disablePlay();
    }, [state.timesup])
    return (
        <GameContext.Provider value={{ state, actions }}>
            <SafeWrapper bg={theme.colors.lightShade}>
                <Wrapper>
                    <ProgressBar enablePlay={state.enablePlay} theme={theme} />

                    <LetterBox letters={game.letters} theme={theme} />

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
                            onPress={() => handleActionBtns(1)}
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
