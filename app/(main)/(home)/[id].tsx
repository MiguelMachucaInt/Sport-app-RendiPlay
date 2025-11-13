import { newsData } from '@/components/news/newsData'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import {
	Dimensions,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View
} from 'react-native'

export default function NewsDetailScreen() {
	const { id } = useLocalSearchParams()
	const router = useRouter()

	const newsItem = newsData.find((item) => item.id === id)
	const screenWidth = Dimensions.get('window').width
	const [imgHeight, setImgHeight] = useState(220)

	useEffect(() => {
		if (newsItem?.image) {
			const imgSource = Image.resolveAssetSource(newsItem.image)
			Image.getSize(imgSource.uri, (w, h) => {
				const ratio = (screenWidth - 32) / w // ancho disponible
				setImgHeight(h * ratio) // recalcula altura proporcional
			})
		}
	}, [newsItem])

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
			{/* Botón volver */}
			<TouchableOpacity onPress={() => router.back()}>
				<Text style={{ color: '#f44336', marginBottom: 12 }}>
					{'< Volver'}
				</Text>
			</TouchableOpacity>

			{/* Imagen principal */}
			<Image
				source={newsItem.image}
				resizeMode="cover"
				style={{
					width: screenWidth - 32,
					height: imgHeight,
					alignSelf: 'center',
					borderRadius: 12,
					marginBottom: 16,
					backgroundColor: '#000'
				}}
			/>

			{/* Título */}
			<Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 4 }}>
				{newsItem.title}
			</Text>

			{/* Tag y fecha */}
			<Text style={{ fontSize: 14, color: '#999', marginBottom: 12 }}>
				{newsItem.tag} ·{' '}
				{new Date(newsItem.date).toLocaleDateString('es-BO', {
					day: 'numeric',
					month: 'long',
					year: 'numeric'
				})}
			</Text>

			{/* Subtítulo */}
			{newsItem.subtitle && (
				<Text style={{ fontSize: 16, color: '#666', marginBottom: 16 }}>
					{newsItem.subtitle}
				</Text>
			)}

			{/* Contenido principal */}
			<Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 20 }}>
				{newsItem.content}
			</Text>

			{/* Secciones extras (solo si existen) */}
			{newsItem.extraSections && newsItem.extraSections.length > 0 && (
				<View style={{ marginTop: 10 }}>
					{newsItem.extraSections.map((section, index) => (
						<View key={index} style={{ marginBottom: 24 }}>
							{section.title && (
								<Text
									style={{
										fontSize: 18,
										fontWeight: '600',
										marginBottom: 6
									}}
								>
									{section.title}
								</Text>
							)}
							{section.image && (
								<Image
									source={section.image}
									resizeMode="cover"
									style={{
										width: '100%',
										height: 180,
										borderRadius: 10,
										marginBottom: 8
									}}
								/>
							)}
							{section.description && (
								<Text style={{ fontSize: 14, color: '#444' }}>
									{section.description}
								</Text>
							)}
						</View>
					))}
				</View>
			)}
		</ScrollView>
	)
}
