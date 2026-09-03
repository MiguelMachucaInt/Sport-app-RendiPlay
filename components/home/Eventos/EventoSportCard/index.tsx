import { colors } from '@/assets/colors/styles'
import SportTeam from '@/components/SportTeam'
import OurCard from '@/components/ui/ourCard'
import { Match } from '@/models/match'
import { getLuxonDate } from '@/utils/date'
import { XStack, YStack } from '@tamagui/stacks'
import { SizableText } from '@tamagui/text'
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions, Text, Image } from 'react-native'
import SportIcon from '../../Rankings/Sport'
import { API_BASE_URL } from '@/constants/app'

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function getApiBaseUrl() {
  const base = (API_BASE_URL || "").trim();
  return base.replace(/\/+$/, "");
}

function toImageUri(value?: string | null) {
  if (!value) return null;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("data:image/")) return value;

  if (UUID_RE.test(value)) {
    const API = getApiBaseUrl();
    if (!API) return null;
    return `${API}/resource/${value}`;
  }

  return `data:image/jpeg;base64,${value}`;
}
interface EventoSportCardProps {
  match: Match
}

function EventoSportCard({ match }: Readonly<EventoSportCardProps>) {
  const currentWidth = Dimensions.get('screen').width
  const date = getLuxonDate(match.program_date ?? match.matchdate, { utc: true })

  const logo1Uri = toImageUri(match.team_logo1)
  const logo2Uri = toImageUri(match.team_logo2)

  return (
    <OurCard
      style={{
        width: currentWidth - currentWidth * 0.1,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 16,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
      }}
    >
      <LinearGradient
        colors={[colors.primary.naranja, colors.secondary.rosado]}
        style={{
          width: '100%',
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 16
        }}
      >
        <SizableText
          fontWeight="900"
          fontSize={18}
          color="white"
          numberOfLines={2}
          style={{ textAlign: 'center' }}
        >
          {match.tournament_desc}
        </SizableText>
      </LinearGradient>

      <XStack
        width="100%"
        alignItems="center"
        justifyContent="center"
        gap={16}
        marginTop={12}
      >
        <YStack alignItems="center" gap={6} width={110}>
          <XStack
            width={46}
            height={46}
            borderRadius={14}
            overflow="hidden"
            backgroundColor="#f2f2f2"
            alignItems="center"
            justifyContent="center"
          >
            {logo1Uri ? (
              <Image
                source={{ uri: logo1Uri }}
                style={{ width: 46, height: 46 }}
                resizeMode="cover"
              />
            ) : (
              <SizableText fontSize={18} fontWeight="900">
                {match.team_desc1?.[0] ?? 'T'}
              </SizableText>
            )}
          </XStack>

          <SportTeam
            teamName={match.team_desc1}
            textProps={{
              width: 110,
              numberOfLines: 1,
              textAlign: 'center',
              fontSize: 13,
              style: {
                color: 'black',
                fontWeight: '700',
                textShadowColor: 'rgba(0,0,0,0.8)',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 4,
                backgroundColor: 'rgba(255,255,255,0.05)',
                paddingHorizontal: 4,
                paddingVertical: 2,
                borderRadius: 4
              }
            }}
          />
        </YStack>
        <YStack alignItems="center" gap={2}>
          <Text style={{ fontWeight: '700', fontSize: 15 }}>
            {date.toUTC().toFormat('dd MMM yyyy')}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: '900' }}>
            {match.field}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: '500', marginVertical: 2 }}>
            VS
          </Text>
          <Text style={{ fontWeight: '700', fontSize: 15 }}>
            {date.toUTC().toFormat('HH:mm')}
          </Text>
        </YStack>
        <YStack alignItems="center" gap={6} width={110}>
          <XStack
            width={46}
            height={46}
            borderRadius={14}
            overflow="hidden"
            backgroundColor="#f2f2f2"
            alignItems="center"
            justifyContent="center"
          >
            {logo2Uri ? (
              <Image
                source={{ uri: logo2Uri }}
                style={{ width: 46, height: 46 }}
                resizeMode="cover"
              />
            ) : (
              <SizableText fontSize={18} fontWeight="900">
                {match.team_desc2?.[0] ?? 'T'}
              </SizableText>
            )}
          </XStack>

          <SportTeam
            teamName={match.team_desc2}
            textProps={{
              width: 110,
              numberOfLines: 1,
              textAlign: 'center',
              fontSize: 13,
              style: {
                color: 'black',
                fontWeight: '700',
                textShadowColor: 'rgba(0,0,0,0.8)',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 4,
                backgroundColor: 'rgba(255,255,255,0.05)',
                paddingHorizontal: 4,
                paddingVertical: 2,
                borderRadius: 4
              }
            }}
          />
        </YStack>
      </XStack>

      <SportIcon
        sport={{
          sport_id: match.sport_id,
          sportdesc: match.sport_desc
        }}
        containerProps={{
          position: 'absolute',
          scale: 0.55,
          right: 10,
          top: -12
        }}
      />
    </OurCard>
  )
}

export default EventoSportCard
