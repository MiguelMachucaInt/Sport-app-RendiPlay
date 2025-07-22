import { Toast, ToastDescription, ToastTitle, useToast } from "@/components/ui/toast"
import { InterfaceToastProps } from "@gluestack-ui/toast/lib/types"

interface OurToastParams extends Omit<InterfaceToastProps, 'render'> {
    title: string
    description?: string
    toastProps?: any
}
export function useOurToast() {
    const toast = useToast()

    const showToast = ({ title, description, toastProps, ...props }: OurToastParams) => {
        const now = new Date().getTime()
        toast.show({
            placement: 'bottom',
            duration: 3000,
            ...props,
            id: now.toString(),
            render: ({ id }) => {
                const uniqueToastId = "toast-" + id
                return (
                    <Toast nativeID={uniqueToastId} action="success" variant="solid" {...toastProps}>
                        <ToastTitle>{title}</ToastTitle>
                        <ToastDescription>
                            {description}
                        </ToastDescription>
                    </Toast>
                )
            },
        })
    }

    return showToast
}
