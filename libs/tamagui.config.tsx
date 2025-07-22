import { defaultConfig } from '@tamagui/config/v4'
import { createTamagui, TamaguiProvider as RnTamaguiProvider } from '@tamagui/core'
import { PropsWithChildren } from 'react'

interface TamaguiProviderProps extends PropsWithChildren { }
function TamaguiProvider({ children }: Readonly<TamaguiProviderProps>) {
    return (
        <RnTamaguiProvider config={createTamagui(defaultConfig)}>
            {children}
        </RnTamaguiProvider>
    )
}


export default TamaguiProvider
