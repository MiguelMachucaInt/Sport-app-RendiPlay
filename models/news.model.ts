import { ImageSourcePropType } from 'react-native'

export interface ExtraSection {
	title?: string
	imageUrl?: string
	description?: string
	image?: ImageSourcePropType
}

export interface News {
	id: string
	title: string
	subtitle?: string
	tag?: string
	date?: string | Date
	imageUrl?: string
	image?: ImageSourcePropType
	content?: string
	extraSections?: ExtraSection[]
	version?: number
	order?: number
	enabled?: boolean
	createdAt?: string
	updatedAt?: string
}
