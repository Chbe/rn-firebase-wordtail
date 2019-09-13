import React, { useState } from 'react'
import { SafeWrapper, PaddingView } from '../components/UI/Containers/Containers'
import { SegmentedControlIOS } from 'react-native';
import ProfilePage from './ProfilePage';
import SettingsPage from './SettingsPage';
import { withTheme } from 'react-native-elements';

const AdministrationPage = ({ navigation, theme }) => {
    const [segmentIndex, setSegmentIndex] = useState(0);

    return (
        <SafeWrapper>
            <PaddingView>
                <SegmentedControlIOS
                    values={['Profile', 'App settings']}
                    selectedIndex={segmentIndex}
                    tintColor={theme.colors.primary}
                    onChange={(event) => {
                        setSegmentIndex(event.nativeEvent.selectedSegmentIndex);
                    }}
                />
                {segmentIndex === 0
                    ? <ProfilePage navigation={navigation} />
                    : <SettingsPage />}
            </PaddingView>
        </SafeWrapper>
    )
}

export default withTheme(AdministrationPage)
