import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Platform,
  TextInput,
  ToastAndroid,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { XStack, YStack } from "@tamagui/stacks";
import { SizableText } from "@tamagui/text";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import OurCard from "@/components/ui/ourCard";
import OurTouchable from "@/components/Touchable";
import TeamsAccessService, { TeamsScope } from "@/services/manager";
import type {
  PlayerCandidate,
  PlayerCandidatesResponse,
  PlayerCategory,
} from "@/models/manager";

type CandidateFilter = "all" | "available" | "with-team";

type Props = {
  open: boolean;
  onClose: () => void;
  teamId: string;
  tournamentId: string;
  scope: TeamsScope;
  onAdded: () => Promise<void> | void;
};

function showToast(message: string) {
  if (Platform.OS === "android") ToastAndroid.show(message, ToastAndroid.SHORT);
  else Alert.alert("Información", message);
}

function getErrorMessage(error: unknown) {
  const message = (error as any)?.response?.data?.message;
  if (Array.isArray(message)) return message.join("\n");
  if (typeof message === "string") return message;
  if (error instanceof Error && error.message !== "Network Error") {
    return error.message;
  }
  if (!(error as any)?.response) {
    return "No se pudo conectar con el backend. Verifica la red y vuelve a intentar.";
  }
  return "No se pudo cargar la lista de jugadores. Intenta nuevamente.";
}

function getInitials(player: { names: string; lastnames: string }) {
  const name = (player.names?.trim()?.[0] ?? "").toUpperCase();
  const lastname = (player.lastnames?.trim()?.[0] ?? "").toUpperCase();
  return lastname + name || "J";
}

function CategoryBadge({ category }: { category?: PlayerCategory }) {
  const hasCategory = !!category?.category_id;
  return (
    <XStack
      paddingHorizontal={9}
      paddingVertical={4}
      borderRadius={999}
      backgroundColor={hasCategory ? "#fff7ed" : "#f4f4f5"}
      borderWidth={1}
      borderColor={hasCategory ? "#fed7aa" : "#d4d4d8"}
      alignItems="center"
      gap={4}
    >
      <Ionicons
        name={hasCategory ? "ribbon-outline" : "help-circle-outline"}
        size={13}
        color={hasCategory ? "#c2410c" : "#71717a"}
      />
      <SizableText
        fontSize={11}
        color={hasCategory ? "#9a3412" : "#52525b"}
        fontWeight="800"
      >
        {category?.category_desc ?? "Sin categoría"}
      </SizableText>
    </XStack>
  );
}

function TeamBadge({ player }: { player: PlayerCandidate }) {
  if (!player.current_team) {
    return (
      <XStack
        paddingHorizontal={9}
        paddingVertical={4}
        borderRadius={999}
        backgroundColor="#ecfdf5"
        borderWidth={1}
        borderColor="#a7f3d0"
        alignItems="center"
        gap={4}
      >
        <Ionicons name="checkmark-circle-outline" size={13} color="#047857" />
        <SizableText fontSize={11} color="#047857" fontWeight="800">
          Sin equipo
        </SizableText>
      </XStack>
    );
  }

  const pending = player.current_team.status === "PENDING";
  return (
    <XStack
      paddingHorizontal={9}
      paddingVertical={4}
      borderRadius={999}
      backgroundColor={pending ? "#fffbeb" : "#fef2f2"}
      borderWidth={1}
      borderColor={pending ? "#fde68a" : "#fecaca"}
      alignItems="center"
      gap={4}
      maxWidth="100%"
    >
      <Ionicons
        name={pending ? "time-outline" : "people-outline"}
        size={13}
        color={pending ? "#a16207" : "#b91c1c"}
      />
      <SizableText
        fontSize={11}
        color={pending ? "#854d0e" : "#991b1b"}
        fontWeight="800"
        numberOfLines={1}
      >
        {pending ? "Solicitud: " : "Equipo: "}
        {player.current_team.team_name}
        {player.current_team.tournament_name
          ? ` · ${player.current_team.tournament_name}`
          : ""}
      </SizableText>
    </XStack>
  );
}

function BlockedBadge() {
  return (
    <XStack
      paddingHorizontal={9}
      paddingVertical={4}
      borderRadius={999}
      backgroundColor="#fef2f2"
      borderWidth={1}
      borderColor="#fecaca"
      alignItems="center"
      gap={4}
    >
      <Ionicons name="ban-outline" size={13} color="#b91c1c" />
      <SizableText fontSize={11} color="#991b1b" fontWeight="800">
        Cuenta bloqueada
      </SizableText>
    </XStack>
  );
}

export default function AddPlayersModal({
  open,
  onClose,
  teamId,
  tournamentId,
  scope,
  onAdded,
}: Props) {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<CandidateFilter>("all");
  const [players, setPlayers] = useState<PlayerCandidate[]>([]);
  const [teamCategory, setTeamCategory] = useState<PlayerCategory | null>(null);
  const [loading, setLoading] = useState(false);
  const [addingUserId, setAddingUserId] = useState<string | null>(null);
  const [loadError, setLoadError] = useState("");
  const requestId = useRef(0);

  const searchMatchedPlayers = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("es");
    if (!term) return players;

    return players.filter((player) => {
      const searchableValues = [
        player.names,
        player.lastnames,
        `${player.names} ${player.lastnames}`,
        `${player.lastnames} ${player.names}`,
        player.ci,
        player.current_team?.team_name,
        player.current_team?.tournament_name,
        ...player.categories.map((category) => category.category_desc),
      ];

      return searchableValues.some((value) =>
        String(value ?? "").toLocaleLowerCase("es").includes(term),
      );
    });
  }, [players, search]);

  const filteredPlayers = useMemo(() => {
    if (filter === "available") {
      return searchMatchedPlayers.filter((player) => player.can_add);
    }
    if (filter === "with-team") {
      return searchMatchedPlayers.filter((player) => !!player.current_team);
    }
    return searchMatchedPlayers;
  }, [filter, searchMatchedPlayers]);

  async function loadCandidates(): Promise<PlayerCandidatesResponse | null> {
    const currentRequest = ++requestId.current;
    setLoading(true);
    setLoadError("");
    try {
      const response = await TeamsAccessService.getPlayerCandidates(
        scope,
        teamId,
        tournamentId,
        "",
      );
      if (currentRequest === requestId.current) {
        setPlayers(Array.isArray(response?.players) ? response.players : []);
        setTeamCategory(response?.team_category ?? null);
      }
      return response;
    } catch (error) {
      const message = getErrorMessage(error);
      console.error("🔴 [EQUIPOS] Error cargando candidatos", {
        status: (error as any)?.response?.status,
        message,
        teamId,
        tournamentId,
      });
      if (currentRequest === requestId.current) {
        setPlayers([]);
        setLoadError(message);
      }
      return null;
    } finally {
      if (currentRequest === requestId.current) setLoading(false);
    }
  }

  useEffect(() => {
    if (!open) return;
    setSearch("");
    setFilter("all");
    loadCandidates();
  }, [open, scope, teamId, tournamentId]);

  async function addPlayer(player: PlayerCandidate) {
    if (!player.can_add || addingUserId) return;
    setAddingUserId(player.user_id);
    try {
      const request = await TeamsAccessService.addPlayer(
        scope,
        teamId,
        tournamentId,
        player.user_id,
      );

      const persisted =
        request?.status === "PENDING" &&
        request?.tournament_id === tournamentId &&
        request?.team_id === teamId &&
        request?.user_id === player.user_id &&
        request?.active !== false;

      if (!persisted) {
        throw new Error(
          "El backend no confirmó la creación de la solicitud. No se mostrará como enviada.",
        );
      }

      setPlayers((currentPlayers) =>
        currentPlayers.map((candidate) =>
          candidate.user_id === player.user_id
            ? {
                ...candidate,
                can_add: false,
                block_reason: "Solicitud enviada; pendiente de aprobación",
                current_team: {
                  team_id: teamId,
                  team_name: player.current_team?.team_name ?? "Equipo seleccionado",
                  tournament_id: tournamentId,
                  tournament_name: null,
                  status: "PENDING",
                },
              }
            : candidate,
        ),
      );

      const refreshed = await loadCandidates();
      const confirmedCandidate = refreshed?.players?.find(
        (candidate) => candidate.user_id === player.user_id,
      );
      const confirmed =
        confirmedCandidate?.current_team?.status === "PENDING" &&
        confirmedCandidate.current_team.team_id === teamId &&
        confirmedCandidate.current_team.tournament_id === tournamentId &&
        confirmedCandidate.can_add === false;

      if (!confirmed) {
        throw new Error(
          "La solicitud fue recibida, pero no pudo confirmarse al volver a consultar el backend.",
        );
      }

      await onAdded();
      showToast("Solicitud enviada correctamente ✅");
    } catch (error) {
      showToast(getErrorMessage(error));
    } finally {
      setAddingUserId(null);
    }
  }

  function confirmAdd(player: PlayerCandidate) {
    if (!player.can_add) return;
    const categories = player.categories.length
      ? player.categories.map((category) => category.category_desc).join(", ")
      : "Sin categoría (se asignará la del equipo)";
    const teamStatus = player.current_team
      ? `${
          player.current_team.status === "PENDING"
            ? "Solicitud pendiente"
            : "Equipo"
        }: ${player.current_team.team_name}${
          player.current_team.tournament_name
            ? ` · ${player.current_team.tournament_name}`
            : ""
        }`
      : "Sin equipo";

    Alert.alert(
      "Agregar jugador",
      `¿Deseas agregar a ${player.lastnames} ${player.names}?\n\nCategoría: ${categories}\nSituación actual: ${teamStatus}`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Agregar", onPress: () => addPlayer(player) },
      ],
    );
  }

  function showUnavailableReason(player: PlayerCandidate) {
    const hasPendingRequest = player.current_team?.status === "PENDING";
    Alert.alert(
      hasPendingRequest ? "Solicitud pendiente" : "Jugador no disponible",
      player.block_reason ?? "Este jugador no se puede agregar al equipo.",
    );
  }

  const filters: { key: CandidateFilter; label: string }[] = [
    { key: "all", label: "Todos" },
    { key: "available", label: "Disponibles" },
    { key: "with-team", label: "Con equipo" },
  ];

  return (
    <Modal
      visible={open}
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="fullScreen"
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
        <YStack flex={1} paddingBottom={16} paddingTop={insets.top + 6} gap={12}>
          <XStack paddingHorizontal={16} alignItems="center" justifyContent="space-between">
            <YStack gap={3} flex={1}>
              <SizableText fontWeight="900" fontSize={20}>
                Agregar jugador
              </SizableText>
              <SizableText fontSize={12} opacity={0.65}>
                Revisa su categoría y equipo antes de agregarlo
              </SizableText>
            </YStack>
            <OurTouchable onPress={onClose} accessibilityLabel="Cerrar">
              <XStack
                width={38}
                height={38}
                borderRadius={19}
                backgroundColor="white"
                alignItems="center"
                justifyContent="center"
                borderWidth={1}
                borderColor="#e4e4e7"
              >
                <Ionicons name="close" size={23} color="#27272a" />
              </XStack>
            </OurTouchable>
          </XStack>

          <XStack
            marginHorizontal={16}
            padding={12}
            borderRadius={14}
            backgroundColor="#eff6ff"
            borderWidth={1}
            borderColor="#bfdbfe"
            alignItems="center"
            gap={10}
          >
            <Ionicons name="shield-checkmark-outline" size={21} color="#1d4ed8" />
            <YStack flex={1} gap={2}>
              <SizableText fontSize={11} color="#1e40af" fontWeight="700">
                CATEGORÍA DEL EQUIPO
              </SizableText>
              <SizableText fontSize={14} color="#1e3a8a" fontWeight="900">
                {teamCategory?.category_desc ?? "Sin categoría configurada"}
              </SizableText>
            </YStack>
          </XStack>

          <XStack
            marginHorizontal={16}
            borderWidth={1}
            borderColor="#d4d4d8"
            backgroundColor="white"
            borderRadius={12}
            paddingHorizontal={12}
            alignItems="center"
            gap={8}
          >
            <Ionicons name="search-outline" size={20} color="#71717a" />
            <TextInput
              style={{ flex: 1, paddingVertical: 11, color: "#18181b" }}
              value={search}
              onChangeText={setSearch}
              placeholder="Buscar por nombre, apellido o CI..."
              placeholderTextColor="#a1a1aa"
              autoCapitalize="none"
              returnKeyType="search"
            />
            {search ? (
              <OurTouchable onPress={() => setSearch("")}>
                <Ionicons name="close-circle" size={19} color="#a1a1aa" />
              </OurTouchable>
            ) : null}
          </XStack>

          <XStack paddingHorizontal={16} gap={8} flexWrap="wrap">
            {filters.map((item) => {
              const selected = filter === item.key;
              return (
                <OurTouchable
                  key={item.key}
                  onPress={() => setFilter(item.key)}
                  activeOpacity={0.75}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  style={{ shadowOpacity: 0, elevation: 0 }}
                >
                  <XStack
                    paddingHorizontal={11}
                    paddingVertical={7}
                    borderRadius={999}
                    backgroundColor={selected ? "#fee2e2" : "#ffffff"}
                    borderWidth={1}
                    borderColor={selected ? "#dc2626" : "#d4d4d8"}
                  >
                    <SizableText
                      fontSize={12}
                      fontWeight="800"
                      color={selected ? "#991b1b" : "#3f3f46"}
                    >
                      {item.label}
                    </SizableText>
                  </XStack>
                </OurTouchable>
              );
            })}
          </XStack>

          {loading ? (
            <YStack flex={1} alignItems="center" justifyContent="center" gap={10}>
              <ActivityIndicator />
              <SizableText opacity={0.6}>Buscando jugadores...</SizableText>
            </YStack>
          ) : loadError ? (
            <YStack flex={1} padding={24} gap={12} alignItems="center" justifyContent="center">
              <Ionicons name="alert-circle-outline" size={36} color="#c0392b" />
              <SizableText opacity={0.75} textAlign="center">
                {loadError}
              </SizableText>
              <OurTouchable onPress={() => loadCandidates()}>
                <XStack
                  paddingHorizontal={16}
                  paddingVertical={9}
                  borderRadius={10}
                  backgroundColor="#fee2e2"
                >
                  <SizableText color="#b91c1c" fontWeight="900">
                    Reintentar
                  </SizableText>
                </XStack>
              </OurTouchable>
            </YStack>
          ) : filteredPlayers.length === 0 ? (
            <YStack flex={1} padding={24} gap={8} alignItems="center" justifyContent="center">
              <Ionicons name="people-outline" size={40} color="#a1a1aa" />
              <SizableText fontWeight="800">No se encontraron jugadores</SizableText>
              <SizableText opacity={0.6} textAlign="center">
                Cambia el filtro o intenta otra búsqueda.
              </SizableText>
            </YStack>
          ) : (
            <FlatList
              style={{ flex: 1 }}
              data={filteredPlayers}
              extraData={`${filter}:${search}:${addingUserId ?? ""}`}
              keyExtractor={(item) => item.user_id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 28, gap: 10 }}
              renderItem={({ item }) => {
                const adding = addingUserId === item.user_id;
                return (
                  <OurCard
                    style={{
                      padding: 13,
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: item.blocked
                        ? "#fecaca"
                        : item.can_add
                          ? "#bbf7d0"
                          : "#e4e4e7",
                      backgroundColor: item.blocked
                        ? "#fffafa"
                        : item.can_add
                          ? "#ffffff"
                          : "#fafafa",
                      gap: 10,
                      opacity: item.can_add ? 1 : 0.82,
                    }}
                  >
                    <XStack alignItems="flex-start" gap={11}>
                      <XStack
                        width={46}
                        height={46}
                        borderRadius={14}
                        backgroundColor={
                          item.blocked
                            ? "#fee2e2"
                            : item.can_add
                              ? "#ecfdf5"
                              : "#f4f4f5"
                        }
                        alignItems="center"
                        justifyContent="center"
                      >
                        <SizableText fontWeight="900" fontSize={16} color="#3f3f46">
                          {getInitials(item)}
                        </SizableText>
                      </XStack>

                      <YStack flex={1} gap={7}>
                        <YStack gap={2}>
                          <SizableText fontWeight="900" fontSize={14} numberOfLines={1}>
                            {item.lastnames} {item.names}
                          </SizableText>
                          <SizableText fontSize={11} opacity={0.6}>
                            CI: {item.ci ?? "--"} · {item.points ?? 0} pts
                          </SizableText>
                        </YStack>

                        <XStack gap={6} flexWrap="wrap">
                          {item.blocked ? <BlockedBadge /> : null}
                          {item.categories.length ? (
                            item.categories.map((category) => (
                              <CategoryBadge key={category.category_id} category={category} />
                            ))
                          ) : (
                            <CategoryBadge />
                          )}
                          <TeamBadge player={item} />
                        </XStack>

                        {!item.can_add && item.block_reason ? (
                          <XStack alignItems="center" gap={5}>
                            <Ionicons name="lock-closed-outline" size={13} color="#71717a" />
                            <SizableText fontSize={11} color="#71717a" flex={1}>
                              {item.block_reason}
                            </SizableText>
                          </XStack>
                        ) : null}
                      </YStack>

                      <OurTouchable
                        disabled={!!addingUserId}
                        onPress={() =>
                          item.can_add
                            ? confirmAdd(item)
                            : showUnavailableReason(item)
                        }
                        accessibilityLabel={
                          item.can_add
                            ? "Agregar jugador"
                            : item.block_reason ?? "No disponible"
                        }
                      >
                        <XStack
                          width={40}
                          height={40}
                          borderRadius={13}
                          backgroundColor={item.can_add ? "#16a34a" : "#e4e4e7"}
                          alignItems="center"
                          justifyContent="center"
                        >
                          {adding ? (
                            <ActivityIndicator size="small" color="white" />
                          ) : (
                            <Ionicons
                              name={item.can_add ? "person-add-outline" : "lock-closed-outline"}
                              size={20}
                              color={item.can_add ? "white" : "#71717a"}
                            />
                          )}
                        </XStack>
                      </OurTouchable>
                    </XStack>
                  </OurCard>
                );
              }}
            />
          )}
        </YStack>
      </SafeAreaView>
    </Modal>
  );
}
