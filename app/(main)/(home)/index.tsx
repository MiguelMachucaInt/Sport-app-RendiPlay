import NewsSection from '@/components/news/NewsSection'
import TopBannerCarousel, {
	BannerItem
} from '@/components/news/TopBannerCarousel'
import NoticiasService from '@/services/news'
import { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'

export default function HomeScreen() {
	const [banners, setBanners] = useState<BannerItem[]>([])

	useEffect(() => {
		NoticiasService.getNoticias().then((data) => {
			const filtered = data
				.filter(
					(item) =>
						item.tag === 'OurCarousel' && item.enabled !== false
				)
				.sort((a, b) => (a.order ?? 999) - (b.order ?? 999))

			const bannerItems: BannerItem[] = filtered.map((item) => ({
				id: item.id,
				image: item.image
			}))

			setBanners(bannerItems)
		})
	}, [])

	return (
		<ScrollView
			style={{ flex: 1 }}
			contentContainerStyle={{ paddingBottom: 40 }}
			showsVerticalScrollIndicator={false}
		>
			<TopBannerCarousel data={banners} />
			<NewsSection />
		</ScrollView>
	)
}
