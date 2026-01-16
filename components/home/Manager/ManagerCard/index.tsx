import OurTouchable from "@/components/Touchable";
import OurCard from "@/components/ui/ourCard";
import { XStack, YStack } from "@tamagui/stacks";
import { SizableText } from "@tamagui/text";
import { Image } from "react-native";
import { router } from "expo-router";
import type { ManagerTeam } from "@/models/manager";

type Props = {
  team: ManagerTeam;
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function toImageUri(value?: string | null) {
  if (!value) return null;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("data:image/")) return value;
  if (UUID_RE.test(value)) {
    const API = process.env.EXPO_PUBLIC_API_URL; 
    return `${API}/resource/${value}`;
  }
  return `data:image/jpeg;base64,${value}`;
}

export default function TeamCard({ team }: Readonly<Props>) {
  const handlePress = () => {
router.push({
  pathname: "/(main)/manager/[teamId]",
  params: { teamId: team.team_id, tournamentId: team.tournament_id, teamName: team.team_name },
});
  };
  const logoUri = toImageUri(team.team_logo);

  return (
    <OurTouchable onPress={handlePress}>
      <OurCard style={{ padding: 14, gap: 10 }}>
        <XStack gap={14} alignItems="center">
          <XStack
            width={64}
            height={64}
            borderRadius={12}
            overflow="hidden"
            backgroundColor="#f2f2f2"
            alignItems="center"
            justifyContent="center"
          >
            {logoUri ? (
              <Image
                source={{ uri: logoUri }}
                style={{ width: 64, height: 64 }}
                resizeMode="cover"
              />
            ) : (
              <SizableText fontSize={22} fontWeight="900">
                {team.team_name?.[0] ?? "T"}
              </SizableText>
            )}
          </XStack>

          <YStack flex={1} gap={4}>
            <SizableText fontSize={12} opacity={0.7}>
              {team.category_desc ?? "Sin categoría"}
            </SizableText>

            <SizableText fontSize={16} fontWeight="900" numberOfLines={1}>
              {team.team_name}
            </SizableText>

            <SizableText fontSize={12} fontStyle="italic" opacity={0.8}>
              {team.branch_desc ?? "Sin rama"}
            </SizableText>
          </YStack>
        </XStack>
      </OurCard>
    </OurTouchable>
  );
}
