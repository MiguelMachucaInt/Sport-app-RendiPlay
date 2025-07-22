
import { FormControlLabel, FormControlLabelText } from '@/components/ui/form-control'
import { YStack } from '@tamagui/stacks'
import { ComponentType } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Labelable } from '../interfaces'

export function withLabel<T extends Labelable = Labelable>(
    Component: ComponentType<T>
) {
    const WrappedComponent = ({ label, ...props }: T) => {
        const isControlled = false
        return label ? (
            <YStack gap={2} {...label.containerProps}>
                {isControlled ? (
                    <FormControlLabel>
                        <FormControlLabelText style={styles.text}>
                            {label.text}
                        </FormControlLabelText>
                    </FormControlLabel>
                ) : (
                    <Text style={styles.text}>
                        {label.text}
                    </Text>
                )}
                <Component {...(props as T)} />
            </YStack>
        ) : (
            <Component {...(props as T)} />
        )
    }
    WrappedComponent.displayName = Component.displayName
    return WrappedComponent
}

const styles = StyleSheet.create({
    text: {
        fontWeight: '600',
        fontSize: 15
    }
})
