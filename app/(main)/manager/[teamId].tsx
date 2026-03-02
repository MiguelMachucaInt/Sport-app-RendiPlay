import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Platform, ToastAndroid, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { XStack, YStack } from "@tamagui/stacks";
import { SizableText } from "@tamagui/text";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import OurCard from "@/components/ui/ourCard";
import OurTouchable from "@/components/Touchable";
import AddPlayersModal from "@/components/home/Manager/Teams/AddPlayersModal";
import TeamsAccessService, { TeamsScope } from "@/services/manager";
import type { TeamPlayer } from "@/models/manager";

type Params = {
  teamId?: string | string[];
  manager?: string | string[];
  tournamentId?: string | string[];
  teamName?: string | string[];
  scope?: string | string[];
};

function pick(param?: string | string[]) {
  if (!param) return "";
  return Array.isArray(param) ? param[0] : param;
}

function showToast(msg: string) {
  if (Platform.OS === "android") ToastAndroid.show(msg, ToastAndroid.SHORT);
  else Alert.alert("Info", msg);
}

export default function ManagerTeamScreen() {
  const params = useLocalSearchParams<Params>();
  const insets = useSafeAreaInsets();

  const teamId = pick(params.teamId) || pick(params.manager);
  const tournamentId = pick(params.tournamentId);
  const teamName = pick(params.teamName);

  const scope: TeamsScope = pick(params.scope) === "owner" ? "owner" : "manager";

  const [players, setPlayers] = useState<TeamPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);

  const canCall = useMemo(() => !!teamId && !!tournamentId, [teamId, tournamentId]);

  async function loadPlayers() {
    if (!canCall) return;
    setLoading(true);
    try {
      const data = await TeamsAccessService.getTeamPlayers(scope, teamId, tournamentId);
      setPlayers(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPlayers();
  }, [teamId, tournamentId, scope]);

  async function onRemove(userId: string) {
    if (!canCall) return;

    Alert.alert("Quitar jugador", "¿Seguro que deseas quitar a este jugador del equipo?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Quitar",
        style: "destructive",
        onPress: async () => {
          await TeamsAccessService.removePlayer(scope, teamId, tournamentId, userId);
          await loadPlayers();
          showToast("Jugador removido 🗑️");
        },
      },
    ]);
  }

  if (!teamId) {
    return (
      <YStack padding={16}>
        <SizableText>No llegó teamId.</SizableText>
      </YStack>
    );
  }

  if (!tournamentId) {
    return (
      <YStack padding={16} gap={8}>
        <SizableText fontWeight="800" fontSize={16}>
          {teamName || "Equipo"}
        </SizableText>
        <SizableText opacity={0.7}>Falta tournamentId para listar/agregar/quitar jugadores.</SizableText>
      </YStack>
    );
  }

  const bottomSpace = insets.bottom - 22;

  return (
    <YStack flex={1} padding={16} gap={12}>
      <XStack alignItems="center" justifyContent="space-between">
        <OurTouchable onPress={() => router.back()}>
          <XStack alignItems="center" gap={6}>
            <Ionicons name="chevron-back" size={22} />
            <SizableText>Volver</SizableText>
          </XStack>
        </OurTouchable>

        <OurTouchable onPress={() => setAddOpen(true)}>
          <XStack alignItems="center" gap={6}>
            <Ionicons name="person-add" size={22} />
            <SizableText fontWeight="800">Agregar</SizableText>
          </XStack>
        </OurTouchable>
      </XStack>

      <SizableText fontWeight="900" fontSize={18}>
        {teamName || "Jugadores"}
      </SizableText>

      {loading ? (
        <YStack height={160} alignItems="center" justifyContent="center">
          <ActivityIndicator />
        </YStack>
      ) : players.length === 0 ? (
        <YStack height={160} alignItems="center" justifyContent="center">
          <SizableText opacity={0.7}>Este equipo no tiene jugadores.</SizableText>
        </YStack>
      ) : (
        <OurCard style={{ padding: 0, overflow: "hidden", flex: 1 }}>
          <FlatList
            style={{ flex: 1 }}
            data={players}
            keyExtractor={(item) => item.user_id}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "#eee" }} />}
            ListFooterComponent={<View style={{ height: bottomSpace }} />}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
            renderItem={({ item }) => (
              <XStack padding={12} alignItems="center" justifyContent="space-between" gap={10}>
                <YStack flex={1} gap={4}>
                  <SizableText fontWeight="900" fontSize={14}>
                    {item.lastnames} {item.names}
                  </SizableText>

                  <XStack gap={12} alignItems="center">
                    <SizableText fontSize={12} opacity={0.7}>
                      CI: {item.ci ?? "--"}
                    </SizableText>
                    <SizableText fontSize={12} opacity={0.7}>
                      Pts: {item.points ?? 0}
                    </SizableText>
                  </XStack>
                </YStack>

                <OurTouchable onPress={() => onRemove(item.user_id)}>
                  <Ionicons name="trash-outline" size={20} color="#c0392b" />
                </OurTouchable>
              </XStack>
            )}
          />
        </OurCard>
      )}

      <AddPlayersModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        teamId={teamId}
        tournamentId={tournamentId}
        scope={scope}
        onAdded={loadPlayers}
      />
    </YStack>
  );
}
