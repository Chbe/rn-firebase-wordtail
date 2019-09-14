import React from 'react';
import { Animated } from 'react-native';
import { useAnimation } from './AnimatedHook';
import { withTheme } from 'react-native-elements';

const ChoosenLetter = ({ letter, theme }) => {
    const animation = useAnimation({ letter });
    return (
        <Animated.Text
            style={{
                color: theme.colors.primary,
                opacity: animation,
                fontSize: 100
            }}
        >
            {letter}
        </Animated.Text>
    )
}

export default withTheme(ChoosenLetter);