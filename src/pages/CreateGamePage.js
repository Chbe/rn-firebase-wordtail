import React, { useState, useEffect } from 'react'
import { SafeWrapper, PaddingView } from '../components/UI/Containers/Containers';
import ListOfUsers from '../components/ListOfUsers'
import styled from 'styled-components'
import { CreateGameContext, CreateGameStore, useCreateGameContext } from '../stores/CreateGameStore'
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import { Input, Button } from 'react-native-elements';

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
                <PaddingView>
                    <View>
                        <Input
                            placeholder='Game title...'
                            leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                            onEndEditing={(ev) => actions.setTitle(ev.nativeEvent.text)}
                        />
                    </View>
                    <ListOfUsers />
                    <Button
                        solid
                        title="Create game"
                        disabled={!gameCanBeCreated()}
                        onPress={() => {
                            createGame();
                        }}
                    />
                </PaddingView>
            </SafeWrapper >
        </CreateGameContext.Provider>
    )
}

export default CreateGamePage
