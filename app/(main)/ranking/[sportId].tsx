import SportIcon from '@/components/home/Rankings/Sport'
import Loading from '@/components/Loading'
import { SportHandler } from '@/controllers/sportHandler'
import SportService from '@/services/sports'
import { YStack } from '@tamagui/stacks'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { useState } from 'react'

interface SportRankingProps { }
function SportRanking({ ...props }: Readonly<SportRankingProps>) {
	const { sportId } = useLocalSearchParams()
	const [refreshing, setRefreshing] = useState(false)
	const { data, isFetching, refetch } = useQuery({
		queryKey: ['getRatingsBySportId', sportId],
		queryFn: () => SportService.getRatingsBySportId(sportId as string)
	})

	function handleRefresh() {
		setRefreshing(true)
		refetch().finally(() => setRefreshing(false))
	}

	const handler = new SportHandler(sportId as string).getHandler()
	return (
		<YStack flex={1} paddingHorizontal={15}>
			<SportIcon
				sport={{
					sport_id: sportId as string,
					sportdesc: sportId as string
				}}
				containerProps={{
					style: {
						marginTop: 40,
						marginBottom: 70
					}
				}}
			/>
			{!isFetching ? (
				handler?.renderRanking({
					data,
					refreshing,
					onRefresh: handleRefresh
				})
			) : (
				<Loading flex={0} />
			)}
		</YStack>
	)
}

export default SportRanking
