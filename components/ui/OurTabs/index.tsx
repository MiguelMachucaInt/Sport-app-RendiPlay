import { ShadowScrollView } from '@/components/ShadowScrollView'
import { mergeStyles } from '@/utils/styles'
import { Tabs, TabsContentProps, TabsListProps, TabsProps } from '@tamagui/tabs'
import { ReactNode, useState } from 'react'
import { ScrollViewProps, StyleSheet } from 'react-native'
import Tab, { TabProps } from './Tab'

export interface ITab {
    tabKey: string
    label: string
    content: ReactNode
}

interface OurTabsProps extends TabsProps {
    tabs: ITab[]
    tabListProps?: TabsListProps
    tabContentProps?: Partial<TabsContentProps>
    scrollViewProps?: ScrollViewProps
    tabProps?: Partial<TabProps>
}
function OurTabs({ tabs, tabListProps, tabContentProps, scrollViewProps, tabProps, ...props }: Readonly<OurTabsProps>) {
    const [activeTab, setActiveTab] = useState<string | undefined>(props.defaultValue)

    function handleTabChange(value: string) {
        setActiveTab(value)
        if (props.onValueChange) {
            props.onValueChange(value)
        }
    }

    return (
        <Tabs {...props} onValueChange={handleTabChange} style={mergeStyles(styles.container, props.style)}>
            <ShadowScrollView
                horizontal
                {...scrollViewProps}
                style={mergeStyles({ width: '100%' }, scrollViewProps?.style)}
                contentContainerStyle={mergeStyles(styles.scrollContainer, scrollViewProps?.contentContainerStyle)}
            >
                <Tabs.List {...tabListProps} style={mergeStyles(styles.tabsContainer, tabListProps?.style)}>
                    {tabs.map(tab => (
                        <Tab key={tab.tabKey} {...tab} {...tabProps} activeKey={activeTab} />
                    ))}
                </Tabs.List>
            </ShadowScrollView>

            {tabs.map(tab => (
                <Tabs.Content key={tab.tabKey} {...tabContentProps} value={tab.tabKey} style={mergeStyles(styles.tabContentContainer, tabContentProps?.style)}>
                    {tab.content}
                </Tabs.Content>
            ))}
        </Tabs>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: 3
    },
    scrollContainer: {
        width: '100%'
    },
    tabsContainer: {
        gap: 20,
        marginHorizontal: 2
    },
    tabContentContainer: {
        paddingVertical: 2,
        paddingHorizontal: 5
    }
})

export default OurTabs
