import { ReactNode } from "react";
import { Text, View } from "react-native";
import { Sport } from "./base";
import { TablaPosicionesFutbolBuilder } from "./tablaPosiciones/futbol";

export class FutbolSport extends Sport {
    renderRanking(): ReactNode {
        return (
            <View>
                <Text>Futbol Ranking</Text>
            </View>
        )
    }

    renderTablaDePosiciones(args?: any): ReactNode {
        return new TablaPosicionesFutbolBuilder().getResult(args)
    }
}
