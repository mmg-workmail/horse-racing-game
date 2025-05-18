import type { StatusRound } from "~/enums/race"
import type { Horse } from "./horse"

export interface RaceRound {
    round: number
    distance: number
    label: string
    status: StatusRound
    results: Horse[]
}