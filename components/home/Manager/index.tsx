import { YStack } from "@tamagui/stacks";
import { SizableText } from "@tamagui/text";
import { ScrollView } from "react-native";
import TeamCard from "./ManagerCard";
import type { ManagerTeam } from "@/models/manager";
import OurCard from "@/components/ui/ourCard";


type Group = {
  tournament_id: string;
  tournament_desc: string;
  teams: ManagerTeam[];
};

function groupByTournament(data: ManagerTeam[] = []): Group[] {
  const map = new Map<string, Group>();

  for (const t of data) {
    const tid = t.tournament_id ?? "unknown";
    // tournament_desc viene del backend; si no existe, fallback
    const tdesc = (t as any).tournament_desc ?? "Torneo";

    if (!map.has(tid)) {
      map.set(tid, { tournament_id: tid, tournament_desc: tdesc, teams: [] });
    }
    map.get(tid)!.teams.push(t);
  }

  // Mantiene el orden de llegada (tu SQL ya viene ordenado por torneo y equipo)
  return Array.from(map.values());
}


export default function ManagerTeams({ data }: { data: ManagerTeam[] }) {
  const has = (data?.length ?? 0) > 0;

 return (
    <YStack gap={10} marginTop={60}>
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }} // ✅ para que no tape el tab bar
        >
        <YStack gap={16} marginTop={71}>
            {groupByTournament(data).map((g) => (
            <YStack key={g.tournament_id} gap={10}>
                {/* Card del Torneo */}
                <OurCard style={{backgroundColor: "#fa6268", width: "100%", paddingVertical: 10, paddingHorizontal: 14, marginHorizontal: 10 }}>
                <SizableText fontSize={14} fontWeight="900" color="#fff">
                    {g.tournament_desc}
                </SizableText>
                <SizableText fontSize={12} color="#fff">
                    {g.teams.length} equipo{g.teams.length === 1 ? "" : "s"}
                </SizableText>
                </OurCard>

                {/* Equipos */}
                <YStack gap={10}>
                {g.teams.map((t) => (
                    <TeamCard key={`${g.tournament_id}-${t.team_id}`} team={t} />
                ))}
                </YStack>
            </YStack>
            ))}

        </YStack>
        </ScrollView>
      )}
    </YStack>
  );
}
