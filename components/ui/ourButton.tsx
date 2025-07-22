import { colors } from '@/assets/colors/styles'
import { mergeStyles } from '@/utils/styles'
import { XStack, XStackProps } from '@tamagui/stacks'
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient'
import { ReactNode } from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacityProps } from 'react-native'
import OurTouchable from '../Touchable'

interface OurButtonProps extends TouchableOpacityProps {
    linearGradientProps?: Partial<LinearGradientProps>
    leftAddon?: ReactNode
    rightAddon?: ReactNode
    textStyles?: StyleProp<TextStyle>
    containerProps?: XStackProps
    variant?: 'solid' | 'outline'
}
function OurButton({
    children,
    linearGradientProps,
    leftAddon,
    rightAddon,
    textStyles,
    containerProps,
    variant = 'solid',
    ...props
}: Readonly<OurButtonProps>) {
    const isOutlined = variant === 'outline'
    return (
        <OurTouchable {...props}>
            <LinearGradient
                colors={[colors.primary.naranja, colors.secondary.rosado]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                {...linearGradientProps}
                style={mergeStyles([
                    styles.linearContainer,
                    isOutlined && styles.linearOutlined,
                    linearGradientProps?.style
                ])}
            >
                <XStack
                    gap={5}
                    justifyContent='center'
                    {...containerProps}
                    style={mergeStyles(isOutlined && styles.outlinedBase, containerProps?.style)}
                >
                    {leftAddon}
                    {typeof children === 'string' ?
                        <Text style={mergeStyles(styles.textBase, isOutlined && styles.textOutlined, textStyles)}
                        >
                            {children}
                        </Text>
                        : children}
                    {rightAddon}
                </XStack>
            </LinearGradient>
        </OurTouchable>
    )
}

const styles = StyleSheet.create({
    linearContainer: {
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    linearOutlined: {
        paddingVertical: 2,
        paddingHorizontal: 2,
    },
    textBase: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'semibold'
    },
    textOutlined: {
        color: colors.primary.naranja
    },
    outlinedBase: {
        backgroundColor: 'white',
        borderRadius: 18,
        paddingVertical: 8,
        paddingHorizontal: 30,
    },
})

export default OurButton
