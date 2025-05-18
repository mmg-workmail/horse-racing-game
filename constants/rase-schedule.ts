import { StatusRound } from "~/enums/race";
import type { RaceRound } from "~/interfaces/race";

export const RaceSchedule: RaceRound[] = [
    { round: 1, distance: 1200, label: '1st Lap: 1200m', status: StatusRound.PENDING, results: [] },
    { round: 2, distance: 1400, label: '2nd Lap: 1400m', status: StatusRound.PENDING, results: [] },
    { round: 3, distance: 1600, label: '3rd Lap: 1600m', status: StatusRound.PENDING, results: [] },
    { round: 4, distance: 1800, label: '4th Lap: 1800m', status: StatusRound.PENDING, results: [] },
    { round: 5, distance: 2000, label: '5th Lap: 2000m', status: StatusRound.PENDING, results: [] },
    { round: 6, distance: 2200, label: '6th Lap: 2200m', status: StatusRound.PENDING, results: [] }
]