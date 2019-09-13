import React, { useState, useEffect } from 'react'
import { SafeWrapper, PaddingView } from '../components/UI/Containers/Containers';
import TextField from '../components/UI/controls/inputs/floating/FloatingInput'
import ListOfUsers from '../components/ListOfUsers'
import { CreateGameContext, CreateGameStore, useCreateGameContext } from '../stores/CreateGameStore'
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import { Input, Button, withTheme } from 'react-native-elements';

const CreateGamePage = ({ navigation, theme }) => {
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
                        <TextField
                            tintColor={theme.colors.primary}
                            label='Game title'
                            onChangeText={(title) => actions.setTitle(title)}
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

export default withTheme(CreateGamePage)
