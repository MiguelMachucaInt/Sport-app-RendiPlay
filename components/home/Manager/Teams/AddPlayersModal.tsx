import React, { useEffect, useState } from "react";
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
import Ionicons from "@expo/vector-icons/Ionicons";
import { XStack, YStack } from "@tamagui/stacks";
import { SizableText } from "@tamagui/text";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import OurCard from "@/components/ui/ourCard";
import OurTouchable from "@/components/Touchable";
import TeamsAccessService, { TeamsScope } from "@/services/manager";
import type { AvailablePlayer } from "@/models/manager";

function showToast(msg: string) {
  if (Platform.OS === "android") ToastAndroid.show(msg, ToastAndroid.SHORT);
  else Alert.alert("Info", msg);
}

function getErrorMessage(error: unknown) {
  const message = (error as any)?.response?.data?.message;
  if (Array.isArray(message)) return message.join("\n");
  return typeof message === "string"
    ? message
    : "No se pudo enviar la solicitud. Intenta nuevamente.";
}

function getInitials(p: { names: string; lastnames: string }) {
  const a = (p.names?.trim()?.[0] ?? "").toUpperCase();
  const b = (p.lastnames?.trim()?.[0] ?? "").toUpperCase();
  return (b + a) || "P";
}

type Props = {
  open: boolean;
  onClose: () => void;

  teamId: string;
  tournamentId: string;

  scope: TeamsScope;
  onAdded: () => Promise<void> | void;
};

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
  const [available, setAvailable] = useState<AvailablePlayer[]>([]);
  const [loadingAvail, setLoadingAvail] = useState(false);

  async function loadAvailable(q?: string) {
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
    if (!open) return;
    setSearch("");
    loadAvailable("");
  }, [open, scope]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => loadAvailable(search), 250);
    return () => clearTimeout(t);
  }, [search, open, scope]);

  async function onAdd(userId: string) {
    try {
      await TeamsAccessService.addPlayer(scope, teamId, tournamentId, userId);
      await Promise.all([onAdded(), loadAvailable(search)]);
      showToast("Solicitud Enviada ✅");
    } catch (error) {
      showToast(getErrorMessage(error));
    }
  }

  function confirmAdd(p: AvailablePlayer) {
    Alert.alert(
      "Agregar jugador",
      `¿Seguro que deseas agregar a:\n\n${p.lastnames} ${p.names}\nCI: ${
        p.ci ?? "--"
      }\nCategoría: ${p.category_desc ?? "Sin categoría"}\nPuntos: ${p.points ?? 0}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Agregar", onPress: () => onAdd(p.user_id) },
      ]
    );
  }

  return (
    <Modal
      visible={open}
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="fullScreen"
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <YStack
          flex={1}
          paddingHorizontal={16}
          paddingBottom={16}
          paddingTop={insets.top + 10}
          gap={12}
        >
          <XStack alignItems="center" justifyContent="space-between">
            <SizableText fontWeight="900" fontSize={18}>
              Agregar jugador
            </SizableText>

            <OurTouchable onPress={onClose}>
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
                      <XStack
                        alignItems="center"
                        justifyContent="space-between"
                        gap={12}
                      >
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

                        <YStack flex={1} gap={6}>
                          <SizableText fontWeight="900" fontSize={14} numberOfLines={1}>
                            {item.lastnames} {item.names}
                          </SizableText>

                          <XStack gap={8} alignItems="center" flexWrap="wrap">
                            {item.category_desc ? (
                              <XStack
                                paddingHorizontal={10}
                                paddingVertical={4}
                                borderRadius={999}
                                backgroundColor="#fff7ed"
                                borderWidth={1}
                                borderColor="#fed7aa"
                                alignItems="center"
                              >
                                <SizableText fontSize={12} opacity={0.85} fontWeight="800">
                                  {item.category_desc}
                                </SizableText>
                              </XStack>
                            ) : null}

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
      </SafeAreaView>
    </Modal>
  );
}
