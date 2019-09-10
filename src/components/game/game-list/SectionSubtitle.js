import React from 'react';
import { Text } from 'react-native-elements';
import { View } from 'react-native';
import styled from 'styled-components';
const appendZero = (value) => {
    return value < 10 ? `0${value}` : value;
}

const formatDate = (date) => {
    const current_datetime = new Date(date);
    const formatted_date =
        `${current_datetime.getFullYear()}-${appendZero((current_datetime.getMonth() + 1))}-${appendZero(current_datetime.getDate())} ${current_datetime.getHours()}:${current_datetime.getMinutes()}`
    return formatted_date;
}

const TextParagraph = styled(Text)`
    margin-top: 5px;
    color: #d2d2d2;
    font-size: 14px;
`;

const SectionSubtitle = ({ item }) => {
    return (
        <View>
            <TextParagraph>
                {item.status === 'active'
                    ? formatDate(item.lastUpdated)
                    : 'Wating for players...'}
            </TextParagraph>
        </View>
    )
}

export default SectionSubtitle
