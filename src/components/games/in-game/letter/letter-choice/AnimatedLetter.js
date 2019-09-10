import React from 'react';
import { Animated } from 'react-native';
import { useAnimation } from './AnimatedHook';

const ChoosenLetter = ({ letter }) => {
    const animation = useAnimation({ letter });
    return (
        <Animated.Text
            style={{
                color: 'green',
                opacity: animation,
                fontSize: 100
            }}
        >
            {letter}
        </Animated.Text>
    )
}

export default ChoosenLetter;