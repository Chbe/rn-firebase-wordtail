import React, { useEffect, useState } from 'react'
import { Animated, View } from 'react-native';
import { PaddingView } from '../../../UI/Containers/Containers';
import { useAnimation } from './ProgressHook';
import styled from 'styled-components'

const Container = styled.View`
    height: 30;
    width: 100%;
    background-color: ${props => props.enablePlay
        ? props.theme.colors[props.progressColor]
        : 'transparent'};
`;

const ProgressBar = ({ enablePlay, duration = 5000, theme }) => {
    const [endWidth, setWidth] = useState(0);
    const animation = useAnimation({ enablePlay, endWidth, duration });

    const [progressColor, updateColor] = useState('success');

    const manageColors = ({ value }) => {
        if (value > (endWidth / 2) && value < (endWidth * .85))
            updateColor(() => 'warning');
        else if (value >= (endWidth * .85))
            updateColor(() => 'danger');
    }

    useEffect(() => {
        if (enablePlay) {
            animation.addListener(manageColors);
        }
        return () => animation.removeAllListeners();
    }, [enablePlay])

    return (
        <PaddingView style={{width: '100%'}}>
            <Container
                enablePlay={enablePlay}
                theme={theme}
                progressColor={progressColor}
                onLayout={(event) => {
                    const { width } = event.nativeEvent.layout;
                    setWidth(width);
                }}
            >
                <Animated.View style={{
                    width: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                    }),
                    height: 30,
                    backgroundColor: theme.colors.lightShade,
                    transform: [{ translateX: animation }]
                }} />
            </Container>
        </PaddingView>
    )
}

export default ProgressBar

