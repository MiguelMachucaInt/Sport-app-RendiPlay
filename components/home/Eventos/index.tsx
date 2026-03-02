"use client";

import OurCarousel from "@/components/ourCarousel";
import { Match } from "@/models/match";
import { YStack } from "@tamagui/stacks";
import { SizableText } from "@tamagui/text";
import { useMemo } from "react";
import EventoSportCard from "./EventoSportCard";

type CurrentTournament = { tournament_id: string; tournament_desc?: string };

interface EventosProps {
  data: Match[];
  currentTournaments: CurrentTournament[];
}

function Eventos({ data, currentTournaments }: Readonly<EventosProps>) {
  const allowedTournamentIds = useMemo(() => {
    return new Set(currentTournaments.map((t) => t.tournament_id));
  }, [currentTournaments]);

  const sortedData = useMemo(() => {
    return [...data]
      .filter((match) => match.state === "P")
      .filter((match) => allowedTournamentIds.has(match.tournament_id))
      .sort((a, b) => {
        const dateA = new Date(a.matchdate).getTime();
        const dateB = new Date(b.matchdate).getTime();
        return dateB - dateA;
      });
  }, [data, allowedTournamentIds]);

  return (
    <YStack gap={3}>
      <SizableText fontWeight={"800"} fontSize={18}>
        Mis Eventos Programados
      </SizableText>

      {sortedData.length === 0 ? (
        <YStack height={250} alignItems="center" justifyContent="center">
          <SizableText fontSize={16} color="#999" textAlign="center">
            Todavía no hay eventos programados.
          </SizableText>
        </YStack>
      ) : (
        <OurCarousel
          data={sortedData}
          renderItem={({ item }) => (
            <EventoSportCard key={item.match_id} match={item} />
          )}
          height={250}
          mode="horizontal-stack"
        />
      )}
    </YStack>
  );
}

export default Eventos;
