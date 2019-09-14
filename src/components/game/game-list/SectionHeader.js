import React from 'react';
import { Text, withTheme } from 'react-native-elements';
import { PaddingView } from '../../UI/Containers/Containers';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components';

const SectionView = styled(PaddingView)`
    flex-direction: row;
    align-items: center;
    background-color: ${props => props.theme.colors.accent};
`;

const SectionIcon = styled(Icon)`
    margin-right: 10px;
`;

const ColoredText = styled(Text)`
    color: ${props => props.textColor};
    font-weight: bold
`;

const SectionHeader = ({ section: { type, data }, theme }) => {
    const textColor = theme.barStyle === 'light-content' ? '#fff' : '#000';
    const length = data.length;
    if (type === 'invite')
        return (
            <SectionView theme={theme}>
                <SectionIcon color={textColor} size={24} name={'envelope'} regular />
                <ColoredText textColor={textColor}>{length === 1 ? 'New invite' : 'New invites'}</ColoredText>
            </SectionView>
        )
    else if (type === 'active')
        return (
            <SectionView theme={theme}>
                <SectionIcon color={textColor} size={24} name={'gamepad'} regular />
                <ColoredText textColor={textColor}>Active or pending</ColoredText>
            </SectionView>
        )
    else if (type === 'finished')
        return (
            <SectionView theme={theme}>
                <SectionIcon color={textColor} size={24} name={'flag-checkered'} regular />
                <ColoredText textColor={textColor}>Finished</ColoredText>
            </SectionView>
        )
}

export default withTheme(SectionHeader)
