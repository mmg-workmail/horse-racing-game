import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'

// 🔁 Move all refs inside functions to avoid stale state between tests
let mockGenerateRaceSchedule: unknown
let mockStartRace: unknown
let mockPauseRace: unknown
let mockResumeRace: unknown
let mockResetGame: unknown

// 🧠 Fresh refs and spies setup per test
const setupMocks = () => {
    mockGenerateRaceSchedule = vi.fn()
    mockStartRace = vi.fn()
    mockPauseRace = vi.fn()
    mockResumeRace = vi.fn()
    mockResetGame = vi.fn()

    vi.doMock('~/stores/modules/race/race', () => ({
        useRaceStore: () => ({
            getRaceSchedule: ref([{ round: 1, label: 'Round 1' }]),
            getRaceResults: ref([{ round: 1, results: [] }]),
            getCurrentRound: ref(1),
            getIsRacing: ref(false),
            getIsPaused: ref(false),
            getGameStatus: ref('IDLE'),
            getCurrentRace: ref({ round: 1, label: 'Round 1' }),
            generateRaceSchedule: mockGenerateRaceSchedule,
            startRace: mockStartRace,
            pauseRace: mockPauseRace,
            resumeRace: mockResumeRace,
            resetGame: mockResetGame,
        })
    }))
}

describe('useRace composable', () => {
    beforeEach(() => {
        vi.resetModules() // ❗ensure isolated imports for each test
        setupMocks()
    })

    it('returns race state refs correctly', async () => {
        const { useRace } = await import('~/composables/race')
        const race = useRace()

        expect(race.raceSchedule.value[0].label).toBe('Round 1')
        expect(race.currentRound.value).toBe(1)
        expect(race.isRacing.value).toBe(false)
        expect(race.gameStatus.value).toBe('IDLE')
    })

    it('calls generateRaceSchedule', async () => {
        const { useRace } = await import('~/composables/race')
        const race = useRace()
        race.generateRaceSchedule()
        expect(mockGenerateRaceSchedule).toHaveBeenCalled()
    })

    it('calls startRace', async () => {
        const { useRace } = await import('~/composables/race')
        const race = useRace()
        race.startRace()
        expect(mockStartRace).toHaveBeenCalled()
    })

    it('calls pauseRace', async () => {
        const { useRace } = await import('~/composables/race')
        const race = useRace()
        race.pauseRace()
        expect(mockPauseRace).toHaveBeenCalled()
    })

    it('calls resumeRace', async () => {
        const { useRace } = await import('~/composables/race')
        const race = useRace()
        race.resumeRace()
        expect(mockResumeRace).toHaveBeenCalled()
    })

    it('calls resetGame', async () => {
        const { useRace } = await import('~/composables/race')
        const race = useRace()
        race.resetGame()
        expect(mockResetGame).toHaveBeenCalled()
    })
})
