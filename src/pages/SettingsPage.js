import React, { useState } from 'react'
import { View, FlatList, Text } from 'react-native';
import { PaddingView } from '../components/UI/Containers/Containers';
import { CheckBox, withTheme } from 'react-native-elements';
import { themes } from '../core/Themes'

const SettingsPage = ({ theme }) => {
    const [choosenTheme, setChoosenTheme] = useState(theme.key);

    return (
        <View>
            <FlatList
                ListHeaderComponent={<PaddingView>
                    <Text>App appearence</Text>
                </PaddingView>}
                data={themes}
                renderItem={({ item }) => <CheckBox
                    containerStyle={{
                        backgroundColor: item.colors.primary
                    }}
                    textStyle={{
                        color: item.colors.lightShade
                    }}
                    title={item.key}
                    checked={item.key === choosenTheme}
                    checkedColor={item.colors.lightShade}
                    onPress={() => setChoosenTheme(item.key)}
                />}
                keyExtractor={item => item.key}
            />
        </View>
    )
}

export default withTheme(SettingsPage)
