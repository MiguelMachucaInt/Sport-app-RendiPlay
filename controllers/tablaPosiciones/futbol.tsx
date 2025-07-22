import { ReactNode } from "react"
import { Text, View } from "react-native"
import { TablaPosicionesBuilder } from "./base"

export class TablaPosicionesFutbolBuilder extends TablaPosicionesBuilder {
    protected setColumnas(): ReactNode {
        return <>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ fontWeight: '800', fontSize: 16 }}>PTS</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ fontWeight: '800', fontSize: 16 }}>PJ</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ fontWeight: '800', fontSize: 16 }}>GF</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ fontWeight: '800', fontSize: 16 }}>GC</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ fontWeight: '800', fontSize: 16 }}>Prom</Text>
            </View>
        </>
    }
    protected setFila(row: any): ReactNode {
        return <>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text style={{ fontWeight: '800', fontSize: 16 }}>
                    {row.points}
                </Text>
            </View>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text style={{ fontSize: 16 }}>{row.played}</Text>
            </View>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text style={{ fontSize: 16 }}>{row.goalsFor}</Text>
            </View>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text style={{ fontSize: 16 }}>
                    {row.goalsAgainst}
                </Text>
            </View>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text style={{ fontSize: 16 }}>{row.prom}</Text>
            </View>
        </>
    }

}
