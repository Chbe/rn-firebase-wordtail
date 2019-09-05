import React from 'react';
import { Text } from 'react-native-elements';
import { PaddingView } from '../../UI/Containers/Containers';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components';

const SectionView = styled(PaddingView)`
    flex-direction: row;
    align-items: center;
    background-color: #e6e6e6;
`;

const SectionIcon = styled(Icon)`
    margin-right: 10px;
`;

const SectionHeader = ({ section: { type, data } }) => {
    const length = data.length;
    if (type === 'invite')
        return (
            <SectionView>
                <SectionIcon size={24} name={'envelope'} regular />
                <Text>{length === 1 ? 'New invite' : 'New invites'}</Text>
            </SectionView>
        )
    else if (type === 'active')
        return (
            <SectionView>
                <SectionIcon size={24} name={'gamepad'} regular />
                <Text>Active or pending</Text>
            </SectionView>
        )
    else if (type === 'finished')
        return (
            <SectionView>
                <SectionIcon size={24} name={'flag-checkered'} regular />
                <Text>Finished</Text>
            </SectionView>
        )
}

export default SectionHeader
