import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useRaceStore } from '~/stores/modules/race/race'
import { useHorseStore } from '~/stores/modules/horse/horse'
import { GameStatus } from '~/enums/game'

// Mock all composables and utils
vi.mock('~/utils/calculate-race-movement', () => ({
    calculateRaceMovement: (horse: any, distance: number) => ({
        ...horse,
        finishTime: Math.floor(Math.random() * 10000) + 1,
    })
}))

vi.mock('~/utils/color', () => ({
    getRandomColor: () => () => '#000000'
}))

vi.mock('~/constants/rase-schedule', () => ({
    RaceSchedule: [
        { round: 1, label: 'Round 1', distance: 1000, status: 'PENDING', results: [] },
        { round: 2, label: 'Round 2', distance: 1200, status: 'PENDING', results: [] },
    ]
}))

describe('Race Store', () => {
    let raceStore: ReturnType<typeof useRaceStore>
    let horseStore: ReturnType<typeof useHorseStore>

    beforeEach(() => {
        setActivePinia(createPinia())
        raceStore = useRaceStore()
        horseStore = useHorseStore()
    })

    it('initial state is correct', () => {
        expect(raceStore.currentRound).toBe(0)
        expect(raceStore.isRacing).toBe(false)
        expect(raceStore.isPaused).toBe(false)
        expect(raceStore.gameStatus).toBe(GameStatus.IDLE)
    })

    it('can generate race schedule', () => {
        raceStore.generateRaceSchedule()
        expect(raceStore.raceSchedule.length).toBeGreaterThan(0)
        expect(raceStore.gameStatus).toBe(GameStatus.READY)
    })

    it('starts a race from round 1', () => {
        raceStore.generateRaceSchedule()
        raceStore.startRace()
        expect(raceStore.currentRound).toBe(1)
        expect(raceStore.gameStatus).toBe(GameStatus.RACING)
    })

    it('pauses and resumes the race', () => {
        raceStore.generateRaceSchedule()
        raceStore.startRace()
        raceStore.pauseRace()
        expect(raceStore.isPaused).toBe(true)
        expect(raceStore.isRacing).toBe(false)

        raceStore.resumeRace()
        expect(raceStore.isPaused).toBe(false)
        expect(raceStore.isRacing).toBe(true)
    })

    it('resets the game correctly', () => {
        raceStore.generateRaceSchedule()
        raceStore.startRace()
        raceStore.resetGame()

        expect(raceStore.currentRound).toBe(0)
        expect(raceStore.isRacing).toBe(false)
        expect(raceStore.raceSchedule.length).toBe(0)
        expect(raceStore.gameStatus).toBe(GameStatus.IDLE)
    })
})
