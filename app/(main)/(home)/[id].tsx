import { newsData } from '@/components/news/newsData'
import { useLocalSearchParams, useRouter, useSegments } from 'expo-router'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

export default function NewsDetailScreen() {
	const { id } = useLocalSearchParams()
	const router = useRouter()

	console.log('id', useSegments())

	const newsItem = newsData.find((item) => item.id === id)

	if (!newsItem) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Text>Noticia no encontrada</Text>
			</View>
		)
	}

	return (
		<ScrollView
			style={{ flex: 1, padding: 16 }}
			contentContainerStyle={{ paddingBottom: 60 }}
		>
			<TouchableOpacity onPress={() => router.back()}>
				<Text style={{ color: '#f44336', marginBottom: 12 }}>
					{'< Volver'}
				</Text>
			</TouchableOpacity>

			<Image
				source={newsItem.image}
				resizeMode="cover"
				style={{
					width: '100%',
					height: 220,
					borderRadius: 12,
					marginBottom: 16
				}}
			/>

			<Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 4 }}>
				{newsItem.title}
			</Text>

			<Text style={{ fontSize: 14, color: '#999', marginBottom: 12 }}>
				{newsItem.tag} ·{' '}
				{new Date(newsItem.date).toLocaleDateString('es-BO', {
					day: 'numeric',
					month: 'long',
					year: 'numeric'
				})}
			</Text>

			{newsItem.subtitle && (
				<Text style={{ fontSize: 16, color: '#666', marginBottom: 16 }}>
					{newsItem.subtitle}
				</Text>
			)}

			<Text style={{ fontSize: 16, lineHeight: 24 }}>
				{newsItem.content}
			</Text>
		</ScrollView>
	)
}
