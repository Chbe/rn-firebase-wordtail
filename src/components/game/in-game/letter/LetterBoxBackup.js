import React, { Component } from 'react'
import { View, Animated } from 'react-native'
import { CenterView } from '../../../UI/Containers/Containers';
import styled from 'styled-components'

const Wrapper = styled(CenterView)`
    border: 5px solid grey;
    border-radius: 15px;
    width: 150;
    height: 150;
`;

const Letter = ({ letter, scale }) => (
    <Animated.Text
        style={{
            color: 'grey',
            opacity: scale,
            fontSize: scale.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 100]
            })
        }}
    >
        {letter}
    </Animated.Text>
);

export default class LetterBox extends Component {
    scale = new Animated.Value(0);
    state = {
        doAnimate: true,
        letter: '',
        letterIndex: -1,
        letters: []
    }

    componentDidUpdate() {
        if (!this.state.letters.length) {
            this.setState({ letters: this.props.letters });
            setTimeout(() => this.pulse(), 500);
        }
    }

    startNewPulse = () => {
        var newIndex = this.state.letterIndex + 1;
        this.setState({ letterIndex: newIndex });
        if (this.state.doAnimate && newIndex < this.state.letters.length) {
            this.setState({ letter: this.state.letters[newIndex] });
            this.pulse();
        }
    }

    pulse = () => {
        Animated.sequence([
            Animated.timing(this.scale, { toValue: 1, duration: 500 }),
            Animated.timing(this.scale, { toValue: 0, duration: 700 }),
        ]).start(() => {
            if (this.state.doAnimate)
                this.startNewPulse();
        });
    };

    componentWillUnmount() {
        this.scale.stopAnimation();
        this.setState({ doAnimate: false });
    }

    render() {
        return (
            <Wrapper>
                <Letter letter={this.state.letter} scale={this.scale} />
            </Wrapper>
        );
    }
}