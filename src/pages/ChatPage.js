import React from 'react'
import { SafeWrapper, PaddingView } from '../components/UI/Containers/Containers'
import { Text } from 'react-native'
import { withTheme } from 'react-native-elements'

const ChatPage = ({ theme }) => {
    return (
        <SafeWrapper bg={theme.colors.shade}>
            <PaddingView>
                <Text>TODO Chat Page</Text>
            </PaddingView>
        </SafeWrapper>
    )
}

export default withTheme(ChatPage)
