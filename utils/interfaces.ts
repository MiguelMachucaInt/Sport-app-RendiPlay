import { IFormControlProps } from '@/components/ui/form-control'
import { YStackProps } from '@tamagui/stacks'
import { ReactNode } from 'react'
import { ScrollViewProps, TouchableOpacityProps } from 'react-native'

export interface Labelable extends Controllable {
	label?: {
		text: string
		containerProps?: YStackProps
	}
}

export interface Renderable<T> {
	render(args?: T): ReactNode
}

export abstract class Handler<T = any> {
	private handler: T

	constructor(handler: T) {
		this.handler = handler
	}

	getHandler(): T {
		return this.handler
	}
}

export interface Builder<T = any> {
	getResult(data?: any): T
}

export interface Scrolleable {
	scrollProps?: ScrollViewProps
}

export interface Touchable {
	touchableProps?: TouchableOpacityProps
}

export interface Controllable {
	controlled?: boolean
	formControlProps?: IFormControlProps
	helperText?: string
	errorText?: string
}
