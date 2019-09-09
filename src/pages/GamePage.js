import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import LetterBox from '../components/games/in-game/letter/LetterBox'
import { CenterView } from '../components/UI/Containers/Containers'

const GamePage = ({ navigation }) => {
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
        <SafeAreaView>
            <CenterView>
                <LetterBox letters={letters} />
            </CenterView>
        </SafeAreaView>
    )
}

export default GamePage
