import { stylesProfile } from '@/assets/customStyles'
import Loading from '@/components/Loading'
import ChartSportProfile from '@/components/profile/chartSport'
import ContactUs from '@/components/profile/contactUs'
import DeleteAccountButton from '@/components/profile/deleteAccount'
import ProfilePicture from '@/components/profile/profilePicture'
import StatsComponent from '@/components/profile/statsComponent'
import { VStack } from '@/components/ui/vstack'
import GeneralService from '@/services/general'
import { getAuthControllerFromProvider, useAuthStore } from '@/state/auth'
import { getAgeFromBirthDate, getLuxonDate } from '@/utils/date'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { RefreshControl, ScrollView, Text, View } from 'react-native'

export default function ProfileScreen() {
	const { user, provider } = useAuthStore()
	const [refreshing, setRefreshing] = useState(false)
	const controller = getAuthControllerFromProvider(provider!)

	const { data, refetch, isFetching } = useQuery({
		queryKey: ['getHomeUserSports'],
		queryFn: () => GeneralService.getHomeUserSports()
	})

	function handleRefresh() {
		setRefreshing(false)
		refetch().finally(() => setRefreshing(false))
	}

	return !isFetching ? (
		<ScrollView
			style={stylesProfile.vStack}
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={handleRefresh}
				/>
			}
		>
			<Text>
				Ingresaste con{' '}
				{controller?.renderIcon ? controller.renderIcon() : null}
			</Text>
			<View style={stylesProfile.imageContainer}>
				<ProfilePicture />
				<StatsComponent dataStats={data?.SportVictories} />
			</View>
			<Text style={stylesProfile.userName}>{user?.name}</Text>
			<VStack style={stylesProfile.sectionContainer}>
				<Text style={stylesProfile.title}>Datos Personales</Text>
			</VStack>
			<VStack style={stylesProfile.dataContainer}>
				<View style={stylesProfile.dataRow}>
					<Text style={stylesProfile.dataLabel}>Nro Documento</Text>
					<Text style={stylesProfile.dataValue}>
						{data?.document_number}
					</Text>
				</View>
				<View style={stylesProfile.dataRow}>
					<Text style={stylesProfile.dataLabel}>
						Fecha Nacimiento
					</Text>
					<Text style={[stylesProfile.dataValue, { width: 300 }]}>
						{data?.birthdate
							? `${getLuxonDate(data?.birthdate).toFormat('DDD')} (${getAgeFromBirthDate(data?.birthdate)} años)`
							: null}
					</Text>
				</View>

				<View style={stylesProfile.dataRow}>
					<Text style={stylesProfile.dataLabel}>Celular</Text>
					<Text style={stylesProfile.dataValue}>
						{data?.cellphone}
					</Text>
				</View>
			</VStack>
			<VStack style={stylesProfile.sectionContainer}>
				<Text style={stylesProfile.title}>Progreso Elo</Text>
			</VStack>
			<ChartSportProfile
				dataHistorial={data?.history}
				dataActual={data?.sports_points}
			/>
			<DeleteAccountButton />
			<ContactUs />
		</ScrollView>
	) : (
		<Loading />
	)
}
