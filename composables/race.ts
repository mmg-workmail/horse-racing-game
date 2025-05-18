import { storeToRefs } from 'pinia'
import { useRaceStore } from '~/stores/race'

export const useRace = () => {
    const raceStore = useRaceStore()

    const {
        getRaceSchedule,
        getCurrentRound,
        getIsRacing,
        getIsPaused,
        getGameStatus,
        getRaceResults,
        getCurrentRace,
    } = storeToRefs(raceStore)

    const generateRaceSchedule = () => {
        raceStore.generateRaceSchedule()
    }

    const startRace = () => {
        raceStore.startRace()
    }

    const pauseRace = () => {
        raceStore.pauseRace()
    }

    const resumeRace = () => {
        raceStore.resumeRace()
    }

    const resetGame = () => {
        raceStore.resetGame()
    }

    return {
        raceSchedule: getRaceSchedule,
        raceResults: getRaceResults,
        currentRound: getCurrentRound,
        isRacing: getIsRacing,
        isPaused: getIsPaused,
        gameStatus: getGameStatus,
        currentRace: getCurrentRace,

        generateRaceSchedule,
        startRace,
        pauseRace,
        resumeRace,
        resetGame
    }
}
