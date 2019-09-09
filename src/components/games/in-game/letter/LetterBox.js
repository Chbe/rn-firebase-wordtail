import React, { useState, useEffect } from 'react'
import { View, Animated } from 'react-native'

const LetterBox = ({ letters }) => {
    const [fadeValue] = useState(new Animated.Value(0));
    const [doAnimate, setDoAnimate] = useState(true);
    const [letter, setLetter] = useState('');
    const [letterIndex, setLetterIndex] = useState(-1);

    const _startNewPulse = () => {
        var newIndex = letterIndex + 1;
        setLetterIndex(newIndex);
        if (doAnimate && newIndex < letters.length) {
            setLetter(letters[newIndex]);
            console.log('newLetter', letter, letterIndex)
            animateIteration();
        }
    }

    const animateIteration = () => {
        Animated.sequence([
            Animated.timing(fadeValue, { toValue: 1, duration: 1000 }),
            Animated.timing(fadeValue, { toValue: 0, duration: 1000 }),
        ]).start(() => {
            if (doAnimate)
                _startNewPulse();
        });
    };

    useEffect(() => {
        if (letters.length) {
            console.log(letters, letters.length);
            _startNewPulse();
        }
        return () => {
            setDoAnimate(false);
            fadeValue.stopAnimation();
        };
    }, [letters])
    return (
        <View>
            <Animated.Text
                style={{
                    opacity: fadeValue,
                    fontSize: fadeValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 50]
                    })
                }}
            >
                {letter}
            </Animated.Text>
        </View>
    )
}

export default LetterBox
