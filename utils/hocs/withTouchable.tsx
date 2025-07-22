
import OurTouchable from '@/components/Touchable'
import { ComponentType } from 'react'
import { Touchable } from '../interfaces'

export function withTouch<T extends Touchable = Touchable>(
    Component: ComponentType<T>
) {
    const WrappedComponent = ({ touchableProps, ...props }: T) => {
        return touchableProps ? (
            <OurTouchable {...touchableProps}>
                <Component {...(props as T)} />
            </OurTouchable>
        ) : (
            <Component {...(props as T)} />
        )
    }
    WrappedComponent.displayName = Component.displayName
    return WrappedComponent
}
