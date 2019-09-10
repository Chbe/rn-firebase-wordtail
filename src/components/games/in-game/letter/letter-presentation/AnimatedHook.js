import { Animated } from 'react-native';
import { useState, useEffect } from 'react';

export const useAnimation = ({ doAnimation }) => {
    const [animation, setAnimation] = useState(new Animated.Value(0));

    useEffect(() => {
        console.log(`running useEffect:`, doAnimation);
        Animated.sequence([
            Animated.timing(animation, { toValue: 1, duration: 500 }),
            Animated.timing(animation, { toValue: 0, duration: 700 }),
        ]).start();
    }, [doAnimation]);

    return animation;
}