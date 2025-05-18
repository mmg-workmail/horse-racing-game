import type { Horse } from "~/interfaces/horse"

export function calculateRaceMovement(horse: Horse, distance: number): Horse {
    const baseSpeed = (horse.condition / 100)
    const finishTime = (distance / baseSpeed);

    return {
        ...horse,
        finishTime
    }
}