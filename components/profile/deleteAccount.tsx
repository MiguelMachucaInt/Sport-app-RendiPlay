import { useOurToast } from '@/hooks/useOurToast'
import TamaguiProvider from '@/libs/tamagui.config'
import AuthService from '@/services/auth'
import { useAuthStore } from '@/state/auth'
import { useLoading } from '@/state/loading'
import { XStack } from '@tamagui/stacks'
import { SizableText } from '@tamagui/text'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from '../ui/alert-dialog'
import OurInput from '../ui/OurInput'

interface DeleteAccountButtonProps { }
function DeleteAccountButton({ ...props }: Readonly<DeleteAccountButtonProps>) {
    const { user, signOut } = useAuthStore()
    const [isOpen, setIsOpen] = useState(false)
    const [passed, setPassed] = useState(false)
    const { showLoading, hideLoading } = useLoading()
    const toast = useOurToast()

    useEffect(() => {
        setPassed(false)
    }, [isOpen])

    function handleAccept() {
        if (passed) {
            showLoading()
            AuthService.deleteAccount()
                .then(() => {
                    signOut(false)
                    toast({
                        title: 'Cuenta Eliminada',
                        description: 'Tu cuenta ha sido eliminada con exito',
                        toastProps: {
                            action: 'success'
                        }
                    })
                })
                .catch(() => {
                    toast({
                        title: 'Error al Eliminar Cuenta',
                        description: 'Intente de nuevo o contacte a soporte',
                        toastProps: {
                            action: 'error'
                        }
                    })
                })
                .finally(() => {
                    hideLoading()
                })
        }
    }

    return (
        <TouchableOpacity style={{ alignSelf: 'center', marginTop: 10 }} onPress={() => setIsOpen(true)}>
            <SizableText style={{ color: 'red', fontWeight: '300' }}>Eliminar mi Cuenta</SizableText>

            <AlertDialog isOpen={isOpen} avoidKeyboard={true}>
                <TamaguiProvider>
                    <AlertDialogBackdrop />
                    <AlertDialogContent style={{ gap: 5 }}>
                        <AlertDialogHeader>
                            <SizableText style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'justify' }}>
                                ¿Seguro que deseas eliminar tu cuenta?
                            </SizableText>
                        </AlertDialogHeader>
                        <AlertDialogBody style={{ marginVertical: 10 }}>
                            <XStack alignItems='center' gap={2}>
                                <Text style={{ fontWeight: 'bold' }}>Importante</Text>
                                <Text style={{ fontSize: 13 }}>Esta acción es irreversible</Text>
                            </XStack>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Ingresa tu correo</Text>
                                <Text style={{ fontWeight: 'semibold' }}>{user?.mail}</Text>
                            </View>
                            <OurInput
                                onChangeText={(mail) => setPassed(mail === user?.mail)}
                            />
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: 'red' }]}
                                onPress={() => setIsOpen(false)}
                            >
                                <Text style={{ color: 'white' }}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, !passed && styles.disabledButton, { backgroundColor: 'green' }]}
                                disabled={!passed}
                                onPress={handleAccept}
                            >
                                <Text style={{ color: 'white' }}>Aceptar</Text>
                            </TouchableOpacity>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </TamaguiProvider>
            </AlertDialog>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10
    },
    disabledButton: {
        opacity: 0.5
    }
})

export default DeleteAccountButton
