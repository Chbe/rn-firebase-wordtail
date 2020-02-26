import React from 'react'
import styled from 'styled-components'
import { CenterView } from '../../UI/Containers/Containers';
import { Button } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const InviteModal = ({ theme }) => {
    const ModalContainer = styled(CenterView)`
    flex-direction: row;
    justify-content: space-around;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 22px;
    border-radius: 4;
`;
    return (
        <ModalContainer>
            <Button
                buttonStyle={{ backgroundColor: theme.colors.success }}
                title='Acccept'
                icon={
                    <FontAwesome5
                        color={theme.barStyle === 'light-content' ? '#fff' : '#000'}
                        size={16}
                        style={{ marginRight: 5 }}
                        name={"check"}
                    />
                }
            />
            <Button
                buttonStyle={{ backgroundColor: theme.colors.danger }}
                title='Decline'
                icon={
                    <FontAwesome5
                        color={theme.barStyle === 'light-content' ? '#fff' : '#000'}
                        size={16}
                        style={{ marginRight: 5 }}
                        name={"times"}
                    />
                }
            />
        </ModalContainer>
    )
}

export default InviteModal
