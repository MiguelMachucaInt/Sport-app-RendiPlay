import TamaguiProvider from '@/libs/tamagui.config'
import { Image } from '@tamagui/image'
import { SizableText } from '@tamagui/text'
import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { ExternalLink } from '../ExternalLink'
import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from '../ui/alert-dialog'

interface ContactUsProps { }
function ContactUs({ ...props }: Readonly<ContactUsProps>) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <TouchableOpacity onPress={() => setIsOpen(true)} style={{ alignSelf: 'center' }}>
            <SizableText>Contáctanos</SizableText>

            <AlertDialog isOpen={isOpen}>
                <TamaguiProvider>
                    <AlertDialogBackdrop />
                    <AlertDialogContent style={{ gap: 5 }}>
                        <AlertDialogHeader style={{ justifyContent: 'center' }}>
                            <SizableText style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'justify' }}>
                                ¿Quienes Somos?
                            </SizableText>
                        </AlertDialogHeader>
                        <AlertDialogBody style={{ marginVertical: 10 }}>
                            <Image
                                src={require('@/assets/images/logo_Integgre.png')}
                                width={'100%'}
                                height={100}
                                resizeMode='contain'
                            />
                            <SizableText textAlign='justify'>
                                Nuestra visión es ser una empresa referente por su capacidad para implementar proyectos tecnológicos exitosos e innovadores que marquen un antes y un después en los negocios de los clientes
                            </SizableText>
                            <SizableText marginTop={5} textAlign='justify'>
                                Envianos un correo a <SizableText fontWeight={'700'}>info@integgre.com</SizableText> o visitanos en nuestra <ExternalLink href={'https://integgre.com'} style={{ color: 'blue' }}>web</ExternalLink>
                            </SizableText>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <TouchableOpacity onPress={() => setIsOpen(false)}>
                                <Text>Cerrar</Text>
                            </TouchableOpacity>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </TamaguiProvider>
            </AlertDialog>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})

export default ContactUs
