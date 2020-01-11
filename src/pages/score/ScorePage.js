import React from 'react'
import { SafeWrapper, PaddingView } from '../../components/UI/Containers/Containers'
import { Text } from 'react-native'
import { withTheme } from 'react-native-elements'

const ScorePage = ({ theme }) => {
    return (
        <SafeWrapper bg={theme.colors.lightShade}>
            <PaddingView>
                <Text>TODO Score Page</Text>
            </PaddingView>
        </SafeWrapper>
    )
}

export default withTheme(ScorePage)
