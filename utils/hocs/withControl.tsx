
import { FormControl, FormControlError, FormControlErrorText, FormControlHelper, FormControlHelperText } from '@/components/ui/form-control';
import Feather from '@expo/vector-icons/Feather';
import { ComponentType } from 'react';
import { Controllable } from '../interfaces';

export function withControl<T extends Controllable = Controllable>(
    Component: ComponentType<T>
) {
    const WrappedComponent = ({ controlled, formControlProps, helperText, errorText, ...props }: T) => {
        return controlled ? (
            <FormControl {...formControlProps}>
                <Component {...(props as T)} />
                {helperText && <FormControlHelper>
                    <FormControlHelperText>
                        {helperText}
                    </FormControlHelperText>
                </FormControlHelper>}
                {errorText && <FormControlError>
                    <Feather name="alert-circle" size={14} color="red" />
                    <FormControlErrorText style={{ fontSize: 12.5 }}>
                        {errorText}
                    </FormControlErrorText>
                </FormControlError>}
            </FormControl>
        ) : (
            <Component {...(props as T)} />
        )
    }
    WrappedComponent.displayName = Component.displayName
    return WrappedComponent
}
