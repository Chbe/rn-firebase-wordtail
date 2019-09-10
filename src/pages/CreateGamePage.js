import React, { useState, useEffect } from 'react'
import { SafeWrapper } from '../components/UI/Containers/Containers';
import { Container, Content, Form, Item, Label, Input } from 'native-base';


const CreateGamePage = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [friends, setFriends] = useState([]);

    return (
        <SafeWrapper>
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Game title...</Label>
                            <Input
                                onEndEditing={(ev) => setTitle(ev.nativeEvent.text)}
                            />
                        </Item>
                    </Form>
                </Content>
            </Container>
        </SafeWrapper>
    )
}

export default CreateGamePage
