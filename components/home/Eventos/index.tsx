import OurCarousel from '@/components/ourCarousel'
import { Match } from '@/models/match'
import { YStack } from '@tamagui/stacks'
import { SizableText } from '@tamagui/text'
import { useMemo } from 'react'
import EventoSportCard from './EventoSportCard'

interface EventosProps {
	data: Match[]
}
function Eventos({ data }: Readonly<EventosProps>) {
	console.log('Data', data)
	const sortedData = useMemo(() => {
		return [...data]
			.filter((match) => match.state === 'P')
			.sort((a, b) => {
				const dateA = new Date(a.matchdate).getTime()
				const dateB = new Date(b.matchdate).getTime()
				return dateB - dateA
			})
	}, [data])

	return (
		<YStack gap={3}>
			<SizableText fontWeight={'800'} fontSize={18}>
				Mis Eventos Programados
			</SizableText>

			{sortedData.length === 0 ? (
				<YStack
					height={150}
					alignItems="center"
					justifyContent="center"
				>
					<SizableText fontSize={16} color="#999" textAlign="center">
						Todavía no hay eventos programados.
					</SizableText>
				</YStack>
			) : (
				<OurCarousel
					data={sortedData}
					renderItem={({ item }) => (
						<EventoSportCard key={item.match_id} match={item} />
					)}
					height={150}
					mode="horizontal-stack"
				/>
			)}
		</YStack>
	)
}

export default Eventos
