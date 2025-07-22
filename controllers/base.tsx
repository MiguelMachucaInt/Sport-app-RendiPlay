import { ReactNode } from "react"

export interface ISport {
    renderRanking(args?: any): ReactNode
    renderTablaDePosiciones(args?: any): ReactNode
    renderTorneoNiveles(args?: any): ReactNode
}

export abstract class Sport implements ISport {
    renderTablaDePosiciones(args?: any): ReactNode {
        return null
    }
    renderRanking(args?: any): ReactNode {
        return null
    }
    renderTorneoNiveles(args?: any): ReactNode {
        return null
    }
}
