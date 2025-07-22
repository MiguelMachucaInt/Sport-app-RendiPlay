import GoogleSignInButton from '@/components/googleSignInButton'
import { Card } from '@/components/ui/card'
import { VStack } from '@/components/ui/vstack'
import { H5 } from '@tamagui/text'
import { Link } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import LoginForm from './_loginForm'

interface LoginScreenProps { }
function LoginScreen({ ...props }: Readonly<LoginScreenProps>) {

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <VStack space='md' style={styles.cardContent}>
                    <H5 fontWeight={'bold'} marginBottom={40} marginTop={10}>INICIAR SESIÓN</H5>
                    <LoginForm />
                    <Link href={'/auth'}>Olvidaste tu Contraseña?</Link>

                    <GoogleSignInButton />
                </VStack>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30
    },
    card: {
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
            width: 0, // Desplazamiento horizontal
            height: 2 // Desplazamiento vertical
        },
        shadowOpacity: 0.25, // Opacidad de la sombra
        shadowRadius: 3.84, // Radio de la sombra
        elevation: 5, // Elevación para Android
        backgroundColor: 'white', // Asegúrate de que el fondo sea visible
        borderRadius: 10, // Opcional: bordes redondeados
        padding: 10
    },
    cardContent: {
        alignItems: 'center',
        width: '100%'
    },
    buttonGoogle: {
        marginVertical: 8
    }
})

export default LoginScreen
