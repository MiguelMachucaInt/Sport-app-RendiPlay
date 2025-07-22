
import { ShadowScrollView } from '@/components/ShadowScrollView'
import { ComponentType } from 'react'
import { Scrolleable } from '../interfaces'

export function withScroll<T extends Scrolleable = Scrolleable>(
    Component: ComponentType<T>
) {
    const WrappedComponent = ({ scrollProps, ...props }: T) => {
        return scrollProps ? (
            <ShadowScrollView {...scrollProps}>
                <Component {...(props as T)} />
            </ShadowScrollView>
        ) : (
            <Component {...(props as T)} />
        )
    }
    WrappedComponent.displayName = Component.displayName
    return WrappedComponent
}
