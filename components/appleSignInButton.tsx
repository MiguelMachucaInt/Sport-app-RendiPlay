import { useAuthStore } from "@/state/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AppleAuthentication from 'expo-apple-authentication';
import { SignInButtonProps } from "./googleSignInButton";

interface AppleSignInButtonProps extends SignInButtonProps { }
function AppleSignInButton({ show = true, onPress, onResponded }: Readonly<AppleSignInButtonProps>) {
    const { signInWithToken } = useAuthStore()

    async function handlePress() {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                ],
            });
            if (credential.identityToken) {
                if (credential.fullName?.givenName) {
                    await AsyncStorage.setItem('appleNames', credential.fullName.givenName)
                }
                if (credential.fullName?.familyName) {
                    await AsyncStorage.setItem('appleLastnames', credential.fullName.familyName)
                }
                await signInWithToken(credential.identityToken, 'APPLE')
            }
        } catch (error) {
            //console.log(JSON.stringify(error))
            if (error.code === 'ERR_CANCELED') {
                // El usuario canceló
            } else {
                throw error;
            }
        }
    }

    return show ? (
        <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={20}
            style={{ height: 44 }}
            onPress={handlePress}
        />
    ) : null
}

export default AppleSignInButton
