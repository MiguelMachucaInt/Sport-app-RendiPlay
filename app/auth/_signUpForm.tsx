import OurDatePicker from '@/components/datePicker'
import OurButton from '@/components/ui/ourButton'
import OurInput from '@/components/ui/OurInput'
import { CreateUserData } from '@/models/user'
import { AuthProviderType, getAuthControllerFromProvider } from '@/state/auth'
import { getLuxonDate } from '@/utils/date'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { XStack, YStack } from '@tamagui/stacks'
import { useEffect, useState } from 'react'
import { Keyboard, Text } from 'react-native'

interface FormValue<T = string> {
    value?: T
    isInvalid?: boolean
    errorMessage?: string
}

interface RegisterForm {
    names: FormValue,
    lastnames: FormValue,
    birthdate: FormValue<Date>,
    document_number: FormValue,
    cellphone: FormValue
}

const eightYearsAgo = getLuxonDate(new Date(), { utc: false }).minus({ years: 8 }).toJSDate()

interface Params {
    key: keyof RegisterForm
    form: RegisterForm
    errorMessage: string
}
function validateField({ key, form, errorMessage }: Params) {
    let value = form[key].value
    if (typeof value === 'string') value = value.trim()
    let isValid = true
    if (!value) {
        isValid = false
        form[key].isInvalid = true
        form[key].errorMessage = errorMessage
    } else {
        form[key].isInvalid = false
        form[key].errorMessage = ''
    }
    return isValid
}

interface SignUpFormProps {
    onSubmit: (data: CreateUserData) => void
    values?: Partial<CreateUserData> & { email: string }
    provider: AuthProviderType
}
function SignUpForm({ onSubmit, values, provider }: Readonly<SignUpFormProps>) {
    const [formData, setFormData] = useState<RegisterForm>({
        names: { value: values?.names ?? '' },
        lastnames: { value: '' },
        birthdate: { value: eightYearsAgo },
        document_number: { value: '' },
        cellphone: { value: '' }
    })
    const providerController = getAuthControllerFromProvider(provider)

    useEffect(() => {
        async function setAppleName() {
            if (provider === 'APPLE' && !values?.names) {
                const names = await AsyncStorage.getItem('appleNames')
                const lastnames = await AsyncStorage.getItem('appleLastnames')
                setFormData(prev => {
                    return {
                        ...prev,
                        names: { ...prev.names, value: names || '' },
                        lastnames: { ...prev.lastnames, value: lastnames || '' }
                    }
                })
            }
        }
        setAppleName()
    }, [provider, values])

    function handleSubmit() {
        if (validate()) {
            onSubmit(Object.entries(formData).reduce((acc, [key, value]) => ({ ...acc, [key]: value.value }), {}) as CreateUserData)
        }
    }

    function validate() {
        const newFormData = { ...formData }
        const valids: boolean[] = []
        valids.push(validateField({ key: 'names', form: newFormData, errorMessage: 'Los nombres son requeridos' }))
        valids.push(validateField({ key: 'lastnames', form: newFormData, errorMessage: 'Los apellidos son requeridos' }))
        setFormData(newFormData)
        return valids.every(v => v)
    }

    function handleChange(key: keyof RegisterForm, value: any) {
        setFormData((prev) => {
            const prevKey = prev[key]
            return {
                ...prev,
                [key]: { ...prevKey, value }
            }
        })
    }

    return (
        <YStack width={'100%'} gap={3} alignSelf='center'>
            <XStack gap={3} alignItems='center' marginBottom={4}>
                <Text style={{ fontSize: 13 }}>Te estas vinculando con tu cuenta de</Text>
                {providerController?.renderIcon && providerController.renderIcon()}
            </XStack>
            <OurInput
                label={{ text: 'Nombres' }}
                controlled
                value={formData.names.value}
                onChangeText={nombres => handleChange('names', nombres)}
                formControlProps={{
                    isInvalid: formData.names.isInvalid,
                }}
                errorText={formData.names.errorMessage}
                maxLength={250}
            />
            <OurInput
                label={{ text: 'Apellidos' }}
                controlled
                value={formData.lastnames.value}
                onChangeText={apellidos => handleChange('lastnames', apellidos)}
                formControlProps={{
                    isInvalid: formData.lastnames.isInvalid
                }}
                errorText={formData.lastnames.errorMessage}
                maxLength={250}
            />
            <OurDatePicker
                label={{ text: 'Fecha de Nacimiento' }}
                mode='date'
                controlled
                maximumDate={eightYearsAgo}
                date={formData.birthdate.value}
                onDateChange={fechaNacimiento => handleChange('birthdate', fechaNacimiento)}
                formControlProps={{
                    isInvalid: formData.birthdate.isInvalid
                }}
                errorText={formData.birthdate.errorMessage}
            />
            <XStack gap={5}>
                <OurInput
                    label={{ text: 'Nro Documento' }}
                    controlled
                    keyboardType='numeric'
                    onBlur={() => Keyboard.dismiss()}
                    value={formData.document_number.value}
                    onChangeText={nroDocumento => handleChange('document_number', nroDocumento)}
                    formControlProps={{
                        isInvalid: formData.document_number.isInvalid,
                        style: { width: '50%' }
                    }}
                    errorText={formData.document_number.errorMessage}
                    maxLength={20}
                />
                <OurInput
                    label={{ text: 'Telefono' }}
                    controlled
                    keyboardType='phone-pad'
                    value={formData.cellphone.value}
                    onChangeText={telefono => handleChange('cellphone', telefono)}
                    formControlProps={{
                        isInvalid: formData.cellphone.isInvalid,
                        style: { width: '50%' }
                    }}
                    errorText={formData.cellphone.errorMessage}
                    maxLength={20}
                />
            </XStack>
            <OurButton onPress={handleSubmit} style={{ marginTop: 10 }}>Registrarme</OurButton>
        </YStack >
    )
}

export default SignUpForm
