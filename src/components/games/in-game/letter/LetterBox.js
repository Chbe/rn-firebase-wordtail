import React, { Component } from 'react'
import { View, Animated } from 'react-native'

const Letter = ({ letter, scale }) => (
    <Animated.Text
        style={{
            opacity: scale,
            fontSize: scale.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 50]
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
            <View>
                <Letter letter={this.state.letter} scale={this.scale} />
            </View>
        );
    }
}