import OurCarousel from '@/components/ourCarousel'
import { Tournament } from '@/models/tournament'
import { isIos } from '@tamagui/core'
import { YStack } from '@tamagui/stacks'
import { SizableText } from '@tamagui/text'
import TorneoCard from './TorneoCard'

interface TorneosProps {
	data: Tournament[]
}

function Torneos({ data }: Readonly<TorneosProps>) {
	const hasTorneos = data && data.length > 0
	return (
		<YStack gap={3}>
			<SizableText fontWeight={'800'} fontSize={18}>
				Mis Torneos
			</SizableText>
			{!hasTorneos ? (
				<YStack
					height={150}
					alignItems="center"
					justifyContent="center"
				>
					<SizableText fontSize={16} color="#999" textAlign="center">
						No tienes torneos vigentes en este momento.
					</SizableText>
				</YStack>
			) : (
				<OurCarousel
					data={data}
					renderItem={({ item }) => {
						return (
							<TorneoCard key={item.tournament_id} data={item} />
						)
					}}
					height={isIos ? 160 : 150}
				/>
			)}
		</YStack>
	)
}

export default Torneos
