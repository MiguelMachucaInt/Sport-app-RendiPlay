import OurButton from '@/components/ui/ourButton'
import OurInput from '@/components/ui/OurInput'
import { YStack } from '@tamagui/stacks'
import { StyleSheet } from 'react-native'

interface LoginFormProps { }
function LoginForm({ ...props }: Readonly<LoginFormProps>) {
    return (
        <YStack width={'80%'} gap={5}>
            <OurInput label={{ text: 'Usuario' }} containerProps={{ style: styles.input }} />
            <OurInput label={{ text: 'Contraseña' }} type='password' containerProps={{ style: styles.input }} />
            <OurButton
                linearGradientProps={{ style: styles.button }}
            >
                Iniciar Sesión
            </OurButton>
        </YStack>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%'
    },
    button: {
        marginTop: 10
    },
})

export default LoginForm
