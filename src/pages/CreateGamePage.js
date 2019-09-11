import React, { useState, useEffect } from 'react'
import { SafeWrapper, PaddingView } from '../components/UI/Containers/Containers';
import { Item, Label, Input, Text, Container, Content, } from 'native-base';
import ListOfUsers from '../components/ListOfUsers'
import styled from 'styled-components'
import { CreateGameContext, CreateGameStore, useCreateGameContext } from '../stores/CreateGameStore'
import { Button } from 'react-native';
import firebase from 'react-native-firebase';

const CreateGamePage = ({ navigation }) => {
    const { state, actions } = CreateGameStore();

    const createGame = async () => {
        if (gameCanBeCreated) {
            const lastUpdated = Date.now();
            await firebase.firestore().collection('games').add({
                ...state,
                lastUpdated
            });
            navigation.goBack();
        }
    }

    const gameCanBeCreated = () => !!(state.title.length > 0 && state.players.length > 1)

    return (
        <CreateGameContext.Provider value={{ state, actions }}>
            <SafeWrapper>
                <Container>
                    <Content>
                        <PaddingView>
                            <Item floatingLabel>
                                <Label>Game title...</Label>
                                <Input
                                    onEndEditing={(ev) => actions.setTitle(ev.nativeEvent.text)}
                                />
                            </Item>
                            <ListOfUsers />
                            <Button
                                title="Create game"
                                disabled={!gameCanBeCreated()}
                                onPress={() => {
                                    createGame();
                                }}
                            />
                        </PaddingView>
                    </Content>
                </Container>
            </SafeWrapper >
        </CreateGameContext.Provider>
    )
}

export default CreateGamePage
