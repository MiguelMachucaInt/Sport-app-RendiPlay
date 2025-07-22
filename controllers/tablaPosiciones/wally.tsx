import { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TablaPosicionesBuilder } from './base'

const DATA_COLUMN_WIDTH = 40 // Ancho fijo para cada columna de datos
const COLUMN_GAP = 2 // Espacio entre columnas de datos

export class TablaPosicionesWallyBuilder extends TablaPosicionesBuilder {
	protected setColumnas(): ReactNode {
		const columns = [
			'PTS',
			'PJ',
			'PG',
			'DS',
			'DP',
			'PP',
			'W.O.',
			'SF',
			'SC',
			'PF',
			'PC'
		]

		return (
			<>
				{columns.map((title, index) => (
					<View
						key={index}
						style={[
							styles.columnHeader,
							{
								width: DATA_COLUMN_WIDTH,
								marginRight:
									index < columns.length - 1 ? COLUMN_GAP : 0
							}
						]}
					>
						<Text style={styles.headerText}>{title}</Text>
					</View>
				))}
			</>
		)
	}

	protected setFila(row: any): ReactNode {
		const data = [
			{ value: row.resultpoints, style: { fontWeight: '800' } },
			{ value: row.victorias + row.derrotas },
			{ value: row.victorias },
			{ value: row.setGanados - row.setPerdidos },
			{ value: row.puntosGanados - row.puntosPerdidos },
			{ value: row.derrotas },
			{ value: row.walkover },
			{ value: row.setGanados },
			{ value: row.setPerdidos },
			{ value: row.puntosGanados },
			{ value: row.puntosPerdidos }
		]

		return (
			<>
				{data.map((item, index) => (
					<View
						key={index}
						style={[
							styles.columnData,
							{
								width: DATA_COLUMN_WIDTH,
								marginRight:
									index < data.length - 1 ? COLUMN_GAP : 0
							}
						]}
					>
						<Text style={[styles.dataText, item.style]}>
							{item.value}
						</Text>
					</View>
				))}
			</>
		)
	}
}

const styles = StyleSheet.create({
	columnsContainer: {
		flexDirection: 'row',
		paddingHorizontal: 8
	},
	columnHeader: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	columnData: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	headerText: {
		fontWeight: '800',
		fontSize: 14
	},
	dataText: {
		fontSize: 14
	}
})
