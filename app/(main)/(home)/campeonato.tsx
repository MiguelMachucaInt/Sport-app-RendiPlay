import Eventos from '@/components/home/Eventos'
import Rankings from '@/components/home/Rankings'
import Torneos from '@/components/home/Torneos'
import UserInfoCard from '@/components/home/UserInfoCard'
import Loading from '@/components/Loading'
import GeneralService from '@/services/general'
import { YStack } from '@tamagui/stacks'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { RefreshControl, ScrollView } from 'react-native'


export default function HomeScreen() {
	const [refreshing, setRefreshing] = useState(false)
	const { data, refetch, isFetching } = useQuery({
		queryKey: ['getHomeUserSports'],
		queryFn: () => GeneralService.getHomeUserSports(),
		gcTime: 0,
		staleTime: 0
	})

	async function handleRefresh() {
		setRefreshing(true)
		refetch().finally(() => setRefreshing(false))
	}

	return !isFetching ? (
		<ScrollView
			contentContainerStyle={{
				paddingTop: 30,
				paddingHorizontal: 20
			}}
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={handleRefresh}
				/>
			}
			showsVerticalScrollIndicator={false}
			nestedScrollEnabled
		>
			<YStack gap={20} marginBottom={5}>
				<UserInfoCard data={data?.sports_points ?? []} />
				<Rankings data={data?.sports ?? []} />
				<Torneos data={data?.currentTournaments ?? []} />
				<Eventos
  data={data?.getNextMatches ?? []}
  currentTournaments={data?.currentTournaments ?? []}
/>
			</YStack>
		</ScrollView>
	) : (
		<Loading />
	)
}
