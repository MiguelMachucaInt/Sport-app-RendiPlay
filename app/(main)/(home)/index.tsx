import NewsSection from '@/components/news/NewsSection'
import TopBannerCarousel, {
	BannerItem
} from '@/components/news/TopBannerCarousel'
import { ScrollView } from 'react-native'

const mockBanners: BannerItem[] = [
	{
		id: '1',
		image: require('@/assets/images/logo.png')
	},
	{
		id: '2',
		image: require('@/assets/teams/Scorpions.jpg')
	},
	{
		id: '3',
		image: require('@/assets/teams/Fox.jpg')
	},
	{
		id: '4',
		image: require('@/assets/teams/Daze.jpg')
	},
	{
		id: '5',
		image: require('@/assets/teams/Prime.jpg')
	}
]

export default function HomeScreen() {
	return (
		<ScrollView
			style={{ flex: 1 }}
			contentContainerStyle={{ paddingBottom: 40 }}
			showsVerticalScrollIndicator={false}
		>
			<TopBannerCarousel data={mockBanners} />
			<NewsSection />
		</ScrollView>
	)
}
