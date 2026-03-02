import React from "react";
import { ActivityIndicator, FlatList, RefreshControl, View } from "react-native";
import { YStack } from "@tamagui/stacks";
import { SizableText } from "@tamagui/text";

import TeamCard from "@/components/home/Manager/ManagerCard/index";
import type { ManagerTeam } from "@/models/manager";
import type { TeamsScope } from "@/services/manager";

type Props = {
  teams: ManagerTeam[];
  scope: TeamsScope;
  loading?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;

  tournamentId?: string;
  tournamentName?: string;
  showHeader?: boolean;
};

export default function TeamsList({
  teams,
  scope,
  loading = false,
  refreshing = false,
  onRefresh,
  tournamentId,
  tournamentName,
  showHeader = true,
}: Props) {
  if (loading) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center">
        <ActivityIndicator />
      </YStack>
    );
  }

  if (!teams?.length) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center" padding={16}>
        <SizableText opacity={0.7}>No tienes equipos para mostrar.</SizableText>
      </YStack>
    );
  }

const inferredTournamentName =
  tournamentName ||
  ((teams?.[0] as any)?.tournament_desc ?? (teams?.[0] as any)?.tournament_name ?? "");

const title = tournamentId
  ? (inferredTournamentName || `Torneo ${tournamentId}`)
  : "Mis equipos";

const subtitle = `${teams.length} equipos`;

  return (
    <FlatList
      data={teams}
      keyExtractor={(item) => item.team_id}
      renderItem={({ item }) => <TeamCard team={item} scope={scope} />}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
      ListHeaderComponent={
        showHeader ? (
          <YStack paddingBottom={12} gap={4}>
            <SizableText fontWeight="900" fontSize={18}>
              {title}
            </SizableText>
            <SizableText opacity={0.7} fontSize={12}>
              {subtitle}
            </SizableText>
          </YStack>
        ) : null
      }
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
      showsVerticalScrollIndicator={false}
    />
  );
}
