import OurTabs from '@/components/ui/OurTabs'
import { Platform } from 'react-native'
import PartidosTab from './_partidos'
import PuntuacionesTab from './_puntuaciones'

function PartidosScreen() {
	const isWeb = Platform.OS === 'web'
	return (
		<OurTabs
			defaultValue='partidos'
			scrollViewProps={{
				contentContainerStyle: { justifyContent: 'center' },
				style: {
					marginVertical: 20,
					backgroundColor: isWeb ? 'white' : ''
				}
			}}
			tabProps={{
				tabStyle: {
					paddingVertical: 13,
					paddingHorizontal: 13,
				}
			}}
			tabs={[
				{
					label: 'Partidos',
					tabKey: 'partidos',
					content: <PartidosTab />
				},
				{
					label: 'Tabla de Posiciones',
					tabKey: 'tablaPosiciones',
					content: <PuntuacionesTab />
				}
			]}
		/>
	)
}

export default PartidosScreen
