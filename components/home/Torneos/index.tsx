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
	return (
		<YStack gap={3}>
			<SizableText fontWeight={'800'} fontSize={18}>
				Mis Torneos
			</SizableText>

			<OurCarousel
				data={data}
				renderItem={({ item }) => {
					return <TorneoCard key={item.tournament_id} data={item} />
				}}
				height={isIos ? 160 : 150}
			/>
		</YStack>
	)
}

export default Torneos
