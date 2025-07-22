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
	const sortedData = useMemo(() => {
		return [...data].sort((a, b) => {
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
			<OurCarousel
				data={sortedData}
				renderItem={({ item }) => {
					return <EventoSportCard key={item.match_id} match={item} />
				}}
				height={150}
				mode="horizontal-stack"
			/>
		</YStack>
	)
}

export default Eventos
