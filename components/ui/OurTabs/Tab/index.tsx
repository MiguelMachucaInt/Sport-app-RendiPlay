import { colors } from '@/assets/colors/styles'
import { mergeStyles } from '@/utils/styles'
import { Tabs } from '@tamagui/tabs'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native'

export interface TabProps {
    tabKey: string
    label: string
    activeKey?: string
    linearStyle?: StyleProp<ViewStyle>
    tabStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
}
function Tab({ activeKey, tabKey, label, linearStyle, tabStyle, textStyle }: Readonly<TabProps>) {
    const isActive = activeKey == tabKey
    return (
        <LinearGradient
            colors={[colors.primary.naranja, colors.secondary.rosado]}
            style={mergeStyles([styles.linearContainer, linearStyle])}
        >
            <Tabs.Tab
                value={tabKey}
                unstyled
                style={mergeStyles(styles.tabGeneral, isActive ? styles.activeTab : styles.inactiveTab, tabStyle)}
            >
                <Text
                    style={mergeStyles(styles.text, isActive ? styles.textActive : styles.textInactive, textStyle)}
                >{label}
                </Text>
            </Tabs.Tab>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    linearContainer: {
        borderRadius: 10,
        padding: 3
    },
    tabGeneral: {
        borderEndEndRadius: 7,
        borderTopEndRadius: 7,
        paddingVertical: 5,
        paddingHorizontal: 15
    },
    inactiveTab: {
        backgroundColor: 'white',
        borderStartStartRadius: 7,
        borderStartEndRadius: 7,
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7,
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7
    },
    activeTab: {
        backgroundColor: 'transparent'
    },
    text: {
        fontWeight: '500',
        fontSize: 15
    },
    textActive: {
        color: 'white'
    },
    textInactive: {
        color: colors.primary.naranja
    }
})

export default Tab
