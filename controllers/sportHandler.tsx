import { Handler } from "@/utils/interfaces"
import { Sport } from "./base"
import { FutbolSport } from "./futbolController"
import { WallySport } from "./wallyController"

export class SportHandler<T extends Sport | null> extends Handler<T> {
    constructor(name: string) {
        const handlers = {
            WALLY: WallySport,
            futbol: FutbolSport
        }
        const handler = handlers[name]
        super(handler ? new handler() : null)
    }
}
