import React from 'react';
import { Text, withTheme } from 'react-native-elements';
import { PaddingView } from '../../UI/Containers/Containers';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components';

const SectionView = styled(PaddingView)`
    flex-direction: row;
    align-items: center;
    margin-top: 20;
    margin-bottom: 10
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
                <SectionIcon color={theme.colors.darkShade} size={24} name={'envelope'} regular />
                <ColoredText textColor={theme.colors.darkShade}>{length === 1 ? 'New invite' : 'New invites'}</ColoredText>
            </SectionView>
        )
    else if (type === 'active')
        return (
            <SectionView theme={theme}>
                <SectionIcon color={theme.colors.darkShade} size={24} name={'gamepad'} regular />
                <ColoredText textColor={theme.colors.darkShade}>Active or pending</ColoredText>
            </SectionView>
        )
    else if (type === 'finished')
        return (
            <SectionView theme={theme}>
                <SectionIcon color={theme.colors.darkShade} size={24} name={'flag-checkered'} regular />
                <ColoredText textColor={theme.colors.darkShade}>Finished</ColoredText>
            </SectionView>
        )
}

export default withTheme(SectionHeader)
