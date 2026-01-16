import { YStack } from "@tamagui/stacks";
import { SizableText } from "@tamagui/text";
import TeamCard from "./ManagerCard";
import type { ManagerTeam } from "@/models/manager";

export default function ManagerTeams({ data }: { data: ManagerTeam[] }) {
  const has = (data?.length ?? 0) > 0;

  return (
    <YStack gap={10}>
      <SizableText fontWeight="800" fontSize={18} paddingLeft={10}>
        Mis Equipos
      </SizableText>

      {!has ? (
        <YStack height={120} alignItems="center" justifyContent="center">
          <SizableText fontSize={16} color="#999" textAlign="center">
            No tienes equipos asignados.
          </SizableText>
        </YStack>
      ) : (
        <YStack gap={10}>
          {data.map((t) => (
            <TeamCard key={t.team_id} team={t} />
          ))}
        </YStack>
      )}
    </YStack>
  );
}
