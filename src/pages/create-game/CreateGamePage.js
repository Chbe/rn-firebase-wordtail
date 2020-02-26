import React from 'react'
import { SafeWrapper, PaddingView } from '../../components/UI/Containers/Containers';
import TextField from '../../components/UI/controls/inputs/floating/FloatingInput'
import ListOfUsers from '../../components/users/ListOfUsers'
import { CreateGameContext, CreateGameStore, useCreateGameContext } from '../../stores/CreateGameStore'
import { View, Text } from 'react-native';
import firebase from 'react-native-firebase';
import { Button, withTheme } from 'react-native-elements';
import UserSearchBar from '../../components/users/UserSearchBar';

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
            <SafeWrapper bg={theme.colors.lightShade}>
                <PaddingView>
                    <View>
                        <TextField
                            tintColor={theme.colors.primary}
                            label='Game title'
                            onChangeText={title => actions.setTitle(title)}
                        />
                    </View>
                    <UserSearchBar></UserSearchBar>
                    <Text>Friends</Text>
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
