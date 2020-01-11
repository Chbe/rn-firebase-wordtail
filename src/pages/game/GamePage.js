import React, { useEffect, useState } from 'react'
import LetterBox from '../../components/game/in-game/letter/LetterBox'
import { CenterView, SafeWrapper } from '../../components/UI/Containers/Containers'
import Keyboard from '../../components/game/in-game/keyboard/Keyboard'
import styled from 'styled-components'
import { View, Alert } from 'react-native'
import { GameContext, GameStore, useGameContext } from '../../stores/GameStore'
import { Button, Icon, withTheme, Text } from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProgressBar from '../../components/game/in-game/progress-bar/ProgressBar'
import firebase from 'react-native-firebase'
import { getClosestActivePlayer, getWordDetails } from '../../services/game/GameService'
import Modal from "react-native-modal";
import Spinner from '../../components/UI/controls/spinner/Spinner'

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

const ModalContainer = styled(CenterView)`
    background-color: #fff;
    padding: 22px;
    border-radius: 4;
    border-color: rgba(0, 0, 0, 0.1);
`;

const GamePage = ({ navigation, theme }) => {
    const { state, actions } = GameStore();
    const time = 25000;
    const maxMarks = 3;
    const [game, setGame] = useState({});
    const [currentUid, setUid] = useState('');

    const [spinnerIsVisable, setSpinnerVisable] = useState(false);
    const [modalIsVisable, setModalVisable] = useState(false);
    const [modalData, setModalData] = useState({});

    const firestoreRef = firebase.firestore()
        .collection('games')
        .doc(game.key);

    const handleGameActions = async (type) => {
        setSpinnerVisable(true);
        actions.disablePlay();

        if (type === 1) {
            /** User clicked send */
            if (state.letter) {
                /** Send letter and set next 
                 * player as next active user. */
                await sendLetter();
                setModalData('Good job! Your letter has been submitted.')
            } else {
                /** Current user gets a mark and next 
                 * player is next active user, unless there's
                 *  only 2 players left and current 
                 * user hits maximum nr or marks.
                 * Then next player is game winner.
                 */
                const nextPLayerWon = await playerSentNoLetter();
                setModalData(nextPLayerWon
                    ? 'You got too many marks so your oppnent won this game. Better luck next time!'
                    : 'You got an mark. You know you can try to bluff right?');

            }
        } else if (type === 2) {
            /** Word API lookup */
            const { dataForResultAlert } = await bustPreviousPlayer();

        } else {
            /** Current user thinks previous player is bluffing. */
        }
        setSpinnerVisable(false);
        setModalVisable(true);
    }

    const sendLetter = async () => {
        const firestoreUpdates = {};
        firestoreUpdates['activePlayer'] = getClosestActivePlayer(game.players, currentUid);
        firestoreUpdates['lastUpdated'] = Date.now();
        firestoreUpdates['letters'] = !!game.letters
            ? [...game.letters, state.letter]
            : [state.letter];
        await updateFirestoreData(firestoreUpdates);
    }

    const playerSentNoLetter = async () => {
        const currentScore = game.players.find(p => p.uid === currentUid).score;
        const nextPlayerWonGame = game.players.length === 2 && currentScore >= maxMarks
            ? true
            : false;
        if (nextPlayerWonGame) {
            await setGameWinner();
        } else {
            await markPlayer(currentUid);
        }
        return nextPlayerWonGame;
    }

    const setGameWinner = async () => {
        const firestoreData = {
            "lastUpdated": Date.now(),
            "players": game.players.map(({ displayName, photoURL, score, uid }) => {
                if (uid === currentUid) {
                    score += 1;
                }
                return { displayName, photoURL, score, uid }
            }),
            "playersUid": [...game.playersUid],
            "status": "completed",
            "title": game.title,
            "winner": getClosestActivePlayer(game.players, currentUid)
        };
        await setFirestoreData(firestoreData);
    }

    const markPlayer = async (_uid) => {
        const firestoreUpdates = {};
        firestoreUpdates['activePlayer'] = getClosestActivePlayer(game.players, currentUid);
        firestoreUpdates['lastUpdated'] = Date.now();
        firestoreUpdates['players'] = game.players.map(player => {
            if (player.uid === _uid) {
                player.score += 1;
            }
            return player;
        });
        await updateFirestoreData(firestoreUpdates);
    }

    const bustPreviousPlayer = async () => {
        const completeWord = game.letters.join('');
        const previousPlayerUid = getClosestActivePlayer(game.players, currentUid, true);
        let setPreviousPlayerActive = false;
        let markUser;
        const wordDefintions = await getWordDetails(completeWord);

        if (wordDefintions.success) {
            /** completeWord is a word. Previous player gets a mark. 
             * Current player starts new round */
            markUser = previousPlayerUid;
        } else {
            /** completeWord is not a word. Current user gets two marks, 
            'next player' is previous player unless
            current user hits maximum nr of marks and there's
            only 1 player left, then previous player is game winner */
            markUser = currentUid;
            setPreviousPlayerActive = true;
        }
        const dataForResultAlert = { type: 'bust', data: { wordDefintions, prevPlayerUid } };
        return { dataForResultAlert, setPreviousPlayerActive, markUser };
    }

    const updateFirestoreData = async (dataObj) => {
        try {
            console.log('updateData:', dataObj)
            //await firestoreRef.update(dataObj);
        } catch (error) {
            console.error(error);
        }
    }

    const setFirestoreData = async (dataObj) => {
        try {
            console.log('setData:', dataObj)
            //await firestoreRef.set(dataObj);
        } catch (error) {
            console.error(error);
        }
    }

    const renderModalContent = () => (
        <ModalContainer>
            <Text>{modalData}</Text>
        </ModalContainer>
    )

    const closeModalAndNavigate = () => {
        setModalVisable(false);
        setTimeout(() => {
            navigation.navigate('Home');
        }, 150);
    }

    useEffect(() => {
        const gameParam = navigation.getParam('game', {});
        const uid = navigation.getParam('uid', '');
        setUid(uid);
        setGame(gameParam);

        if (!gameParam.letters) {
            setTimeout(() => actions.enablePlay(), 1000);
        }
        return () => {

        };
    }, [])

    useEffect(() => {
        /** Event handler if time runs out */
        actions.disablePlay();
        if (state.timesup) {
            handleGameActions(1);
        }
    }, [state.timesup])
    return (
        <GameContext.Provider value={{ state, actions }}>
            <SafeWrapper bg={theme.colors.lightShade}>
                <Modal
                    isVisible={modalIsVisable}
                    backdropColor={theme.colors.primary}
                    backdropOpacity={0.8}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={600}
                    animationOutTiming={600}
                    backdropTransitionInTiming={600}
                    backdropTransitionOutTiming={600}
                    onBackdropPress={() => closeModalAndNavigate()}
                    onSwipeComplete={() => closeModalAndNavigate()}
                    swipeDirection={['left', 'right']}
                >
                    {renderModalContent()}
                </Modal>
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
                            onPress={() => handleGameActions(1)}
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
                            onPress={() => handleGameActions(2)}
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
            <Spinner
                animate={spinnerIsVisable}
                onPress={() => setSpinnerVisable(false)}
                color={theme.colors.primary} />
        </GameContext.Provider>
    )
}

export default withTheme(GamePage)
