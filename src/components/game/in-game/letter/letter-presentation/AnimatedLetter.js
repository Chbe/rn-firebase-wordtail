import React from 'react';
import { Animated } from 'react-native';
import { useAnimation } from './AnimatedHook';

const AnimatedLetter = ({ letter, doAnimation }) => {
    const animation = useAnimation({ doAnimation });
    return (
        <Animated.Text
            style={{
                color: 'grey',
                opacity: animation,
                fontSize: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 100]
                })
            }}
        >
            {letter}
        </Animated.Text>
    )
}

export default AnimatedLetter;