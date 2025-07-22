import { Card } from '@/components/ui/card'
import { useOurToast } from '@/hooks/useOurToast'
import { CreateUserData } from '@/models/user'
import AuthService from '@/services/auth'
import { AuthProviderType, useAuthStore } from '@/state/auth'
import { useLoading } from '@/state/loading'
import { isIos } from '@tamagui/core'
import { YStack } from '@tamagui/stacks'
import { AxiosError, HttpStatusCode } from 'axios'
import { router, useLocalSearchParams } from 'expo-router'
import { Keyboard, KeyboardAvoidingView, Text, TouchableWithoutFeedback } from 'react-native'
import SignUpForm from './_signUpForm'

interface SignUpProps { }
function SignUp({ ...props }: Readonly<SignUpProps>) {
    const { token, email, name, provider } = useLocalSearchParams()
    const { showLoading, hideLoading } = useLoading()
    const { signInWithUser } = useAuthStore()
    const toast = useOurToast()

    async function handleSignUp(data: CreateUserData) {
        showLoading()
        try {
            const created = await AuthService.register({
                data,
                provider: provider as AuthProviderType,
                token: token as string
            })
            await signInWithUser(created, provider as AuthProviderType)
        } catch (error) {
            const axiosError = error as AxiosError
            if (axiosError.status === HttpStatusCode.Unauthorized) {
                toast({
                    title: 'Error',
                    description: 'Token expirado, vuelva a intentarlo',
                    toastProps: {
                        action: 'error'
                    }
                })
                router.replace('/auth')
            } else {
                toast({
                    title: 'Error',
                    description: 'Hubo un problema al crear el usuario, revise los datos y tipos de datos requeridos',
                    toastProps: {
                        action: 'error'
                    }
                })
            }
        } finally {
            hideLoading()
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', position: 'relative' }} behavior='padding'>
                <YStack
                    position='absolute'
                    top={20}
                    left={5}
                    zIndex={99}
                >
                    <Text
                        style={{ fontWeight: 'bold', fontSize: isIos ? 30 : 40, color: 'black' }}
                    >
                        Nuevo/a por acá?
                    </Text>
                    <Text
                        style={{ fontWeight: 'bold', fontSize: isIos ? 25 : 33, color: 'black' }}
                    >
                        Registrate
                    </Text>
                </YStack>
                <Card style={{ marginHorizontal: 30, alignItems: 'center', borderWidth: 0.2, zIndex: 999 }}>
                    <SignUpForm
                        onSubmit={handleSignUp}
                        values={{
                            names: name as string,
                            email: email as string
                        }}
                        provider={provider as AuthProviderType}
                    />
                </Card>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default SignUp
