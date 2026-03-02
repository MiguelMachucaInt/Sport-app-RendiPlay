import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Platform,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import { XStack, YStack } from "@tamagui/stacks";
import { SizableText } from "@tamagui/text";

import OurCard from "@/components/ui/ourCard";
import OurTouchable from "@/components/Touchable";

import TeamsAccessService, { TeamsScope } from "@/services/manager";
import type { AvailablePlayer, TeamPlayer } from "@/models/manager";

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

  const teamId = pick(params.teamId) || pick(params.manager);
  const tournamentId = pick(params.tournamentId);
  const teamName = pick(params.teamName);

  const scope: TeamsScope = pick(params.scope) === "owner" ? "owner" : "manager";

  const [players, setPlayers] = useState<TeamPlayer[]>([]);
  const [loading, setLoading] = useState(true);

  const [addOpen, setAddOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [available, setAvailable] = useState<AvailablePlayer[]>([]);
  const [loadingAvail, setLoadingAvail] = useState(false);

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

  async function loadAvailable(q?: string) {
    if (!canCall) return;
    setLoadingAvail(true);
    try {
      const data = await TeamsAccessService.getAvailablePlayers(
        scope,
        teamId,
        tournamentId,
        q ?? ""
      );
      setAvailable(data);
    } finally {
      setLoadingAvail(false);
    }
  }

  useEffect(() => {
    loadPlayers();
  }, [teamId, tournamentId, scope]);

  useEffect(() => {
    if (!addOpen) return;
    const t = setTimeout(() => loadAvailable(search), 250);
    return () => clearTimeout(t);
  }, [search, addOpen, scope]);

  async function onAdd(userId: string) {
    if (!canCall) return;
    await TeamsAccessService.addPlayer(scope, teamId, tournamentId, userId);
    await Promise.all([loadPlayers(), loadAvailable(search)]);
    showToast("Jugador agregado ✅");
  }

  async function onRemove(userId: string) {
    if (!canCall) return;

    Alert.alert("Quitar jugador", "¿Seguro que deseas quitar a este jugador del equipo?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Quitar",
        style: "destructive",
        onPress: async () => {
          await TeamsAccessService.removePlayer(scope, teamId, tournamentId, userId);
          await Promise.all([loadPlayers(), loadAvailable(search)]);
          showToast("Jugador removido 🗑️");
        },
      },
    ]);
  }

  function getInitials(p: { names: string; lastnames: string }) {
    const a = (p.names?.trim()?.[0] ?? "").toUpperCase();
    const b = (p.lastnames?.trim()?.[0] ?? "").toUpperCase();
    return (b + a) || "P";
  }

  function confirmAdd(p: AvailablePlayer) {
    Alert.alert(
      "Agregar jugador",
      `¿Seguro que deseas agregar a:\n\n${p.lastnames} ${p.names}\nCI: ${p.ci ?? "--"}\nPuntos: ${
        p.points ?? 0
      }?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Agregar", onPress: () => onAdd(p.user_id) },
      ]
    );
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
        <SizableText opacity={0.7}>
          Falta tournamentId para listar/agregar/quitar jugadores.
        </SizableText>
      </YStack>
    );
  }

  return (
    <YStack flex={1} padding={16} gap={12}>
      {/* Header */}
      <XStack alignItems="center" justifyContent="space-between">
        <OurTouchable onPress={() => router.back()}>
          <XStack alignItems="center" gap={6}>
            <Ionicons name="chevron-back" size={22} />
            <SizableText>Volver</SizableText>
          </XStack>
        </OurTouchable>

        <OurTouchable
          onPress={() => {
            setAddOpen(true);
            setSearch("");
            loadAvailable("");
          }}
        >
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
        <OurCard style={{ padding: 0, overflow: "hidden" }}>
          <FlatList
            data={players}
            keyExtractor={(item) => item.user_id}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "#eee" }} />}
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

      {/* Modal Agregar */}
      <Modal visible={addOpen} animationType="slide" onRequestClose={() => setAddOpen(false)}>
        <YStack flex={1} padding={16} gap={12}>
          <XStack alignItems="center" justifyContent="space-between">
            <SizableText fontWeight="900" fontSize={18}>
              Agregar jugador
            </SizableText>

            <OurTouchable onPress={() => setAddOpen(false)}>
              <Ionicons name="close" size={26} />
            </OurTouchable>
          </XStack>

          <View
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 10,
              paddingHorizontal: 12,
              paddingVertical: 8,
            }}
          >
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Buscar por nombre, apellido o CI..."
              autoCapitalize="none"
            />
          </View>

          {loadingAvail ? (
            <YStack height={120} alignItems="center" justifyContent="center">
              <ActivityIndicator />
            </YStack>
          ) : available.length === 0 ? (
            <YStack height={120} alignItems="center" justifyContent="center">
              <SizableText opacity={0.7}>No hay jugadores disponibles.</SizableText>
            </YStack>
          ) : (
            <YStack gap={10} flex={1}>
              <XStack alignItems="center" justifyContent="space-between">
                <SizableText opacity={0.7}>{available.length} disponibles</SizableText>
                <SizableText opacity={0.6} fontSize={12}>
                  Toca uno para agregar
                </SizableText>
              </XStack>

              <FlatList
                data={available}
                keyExtractor={(item) => item.user_id}
                contentContainerStyle={{ paddingBottom: 24, gap: 10 }}
                renderItem={({ item }) => (
                  <OurTouchable onPress={() => confirmAdd(item)}>
                    <OurCard
                      style={{
                        padding: 12,
                        borderRadius: 16,
                        borderWidth: 1,
                        borderColor: "#eee",
                        backgroundColor: "white",
                        gap: 10,
                      }}
                    >
                      <XStack alignItems="center" justifyContent="space-between" gap={12}>
                        {/* Avatar */}
                        <XStack
                          width={44}
                          height={44}
                          borderRadius={14}
                          backgroundColor="#f4f4f5"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <SizableText fontWeight="900" fontSize={16} opacity={0.85}>
                            {getInitials(item)}
                          </SizableText>
                        </XStack>

                        {/* Info */}
                        <YStack flex={1} gap={6}>
                          <SizableText fontWeight="900" fontSize={14} numberOfLines={1}>
                            {item.lastnames} {item.names}
                          </SizableText>

                          <XStack gap={8} alignItems="center" flexWrap="wrap">
                            <XStack
                              paddingHorizontal={10}
                              paddingVertical={4}
                              borderRadius={999}
                              backgroundColor="#f7f7f7"
                              borderWidth={1}
                              borderColor="#eee"
                              alignItems="center"
                            >
                              <SizableText fontSize={12} opacity={0.75}>
                                CI: {item.ci ?? "--"}
                              </SizableText>
                            </XStack>

                            <XStack
                              paddingHorizontal={10}
                              paddingVertical={4}
                              borderRadius={999}
                              backgroundColor="#f1f8ff"
                              borderWidth={1}
                              borderColor="#dbeafe"
                              alignItems="center"
                            >
                              <SizableText fontSize={12} opacity={0.85} fontWeight="800">
                                {item.points ?? 0} pts
                              </SizableText>
                            </XStack>
                          </XStack>
                        </YStack>

                        {/* Botón + */}
                        <XStack
                          width={38}
                          height={38}
                          borderRadius={14}
                          backgroundColor="#eafff1"
                          alignItems="center"
                          justifyContent="center"
                          borderWidth={1}
                          borderColor="#b7f7cf"
                        >
                          <Ionicons name="add" size={22} color="#16a34a" />
                        </XStack>
                      </XStack>
                    </OurCard>
                  </OurTouchable>
                )}
              />
            </YStack>
          )}
        </YStack>
      </Modal>
    </YStack>
  );
}
