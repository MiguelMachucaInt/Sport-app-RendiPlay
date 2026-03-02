import React, { useEffect, useMemo, useState } from "react";
import { YStack } from "@tamagui/stacks";
import { useLocalSearchParams } from "expo-router";

import TeamsList from "@/components/home/Manager/Teams/TeamsList";
import TeamsAccessService, { TeamsScope } from "@/services/manager";
import type { ManagerTeam } from "@/models/manager";

type Params = {
  scope?: string | string[];
  tournamentId?: string | string[];
  tournamentName?: string | string[];
};

function pick(param?: string | string[]) {
  if (!param) return "";
  return Array.isArray(param) ? param[0] : param;
}

export default function TeamsScreen({ fixedScope }: { fixedScope?: TeamsScope }) {
  const params = useLocalSearchParams<Params>();

  const scope: TeamsScope = useMemo(() => {
    if (fixedScope) return fixedScope;
    return pick(params.scope) === "owner" ? "owner" : "manager";
  }, [params.scope, fixedScope]);

  const tournamentId = pick(params.tournamentId) || undefined;
  const tournamentName = pick(params.tournamentName) || "";

  const [teams, setTeams] = useState<ManagerTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function loadTeams(isRefresh = false) {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const data = await TeamsAccessService.getTeams(scope, tournamentId);
      setTeams(data);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadTeams(false);
  }, [scope, tournamentId]);

  return (
    <YStack flex={1}>
      <TeamsList
        teams={teams}
        scope={scope}
        loading={loading}
        refreshing={refreshing}
        onRefresh={() => loadTeams(true)}
        tournamentId={tournamentId}
        tournamentName={tournamentName}
      />
    </YStack>
  );
}
