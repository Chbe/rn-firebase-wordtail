import React, { useEffect, useState } from 'react'
import AnimatedLetter from './letter-presentation/AnimatedLetter';
import styled from 'styled-components'
import { CenterView } from '../../../UI/Containers/Containers';
import { useGameContext } from '../../../../stores/GameStore';
import ChoosenLetter from './letter-choice/AnimatedLetter';

const Wrapper = styled(CenterView)`
    border: 5px solid grey;
    border-radius: 15px;
    width: 150;
    height: 150;
`;

const LetterBox = ({ letters = [] }) => {
    const [doAnimation, setDoAnimation] = useState(false);
    const [chooseLetter, setChooseLetter] = useState(false);
    const { state, actions } = useGameContext();

    const startAnimation = () => {
        var letterIndex = 0;
        const handler = setInterval(() => {
            animateLetter(letters[letterIndex]);
            setDoAnimation(false);
            letterIndex++;
            if (letterIndex >= letters.length) {
                clearInterval(handler);
                setTimeout(() => {
                    actions.setLetter('');
                    setChooseLetter(true);
                }, 1200);
            }
        }, 1200);
    }

    const animateLetter = (letter) => {
        actions.setLetter(letter);
        setDoAnimation(true);
    }

    useEffect(() => {
        if (letters.length) {
            startAnimation();
        }
        return () => {

        };
    }, [letters])
    return (
        <Wrapper>
            {!chooseLetter
                ? <AnimatedLetter letter={state.letter} doAnimation={doAnimation} />
                : <ChoosenLetter letter={state.letter} />}
        </Wrapper>
    )
}

export default LetterBox
