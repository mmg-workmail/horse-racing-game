import { defineStore } from 'pinia'
import { useHorseStore } from './horse'
import type { RaceRound } from '~/interfaces/race'
import { GameStatus } from '~/enums/game'
import { StatusRound } from '~/enums/race'
import { calculateRaceMovement } from '~/utils/calculate-race-movement'
import { RaceSchedule } from '~/constants/rase-schedule'
import type { Horse } from '~/interfaces/horse'
import { GameSettings } from '~/constants/game-settings'

export const useRaceStore = defineStore('race', {
    state: () => ({
        raceSchedule: [] as RaceRound[],
        currentRound: 0,
        isRacing: false,
        isPaused: false,
        gameStatus: GameStatus.IDLE as GameStatus,
        animationFrameId: null as number | null,
        elapsedTime: 0,
    }),

    getters: {
        getRaceSchedule: (state) => state.raceSchedule,
        getRaceResults: (state) => {
            return state.raceSchedule.map((race) => {
                const sortedResults = [...race.results]
                    .sort((a, b) => a.finishTime! - b.finishTime!)
                    .map((horse, index) => ({ ...horse, position: index + 1 }))

                return {
                    ...race,
                    results: sortedResults,
                }
            })
        },
        getCurrentRound: (state) => state.currentRound,
        getIsRacing: (state) => state.isRacing,
        getIsPaused: (state) => state.isPaused,
        getGameStatus: (state) => state.gameStatus,
        getCurrentRace: (state) =>
            state.currentRound > 0 ? state.raceSchedule[state.currentRound - 1] : null,
    },

    actions: {
        generateRaceSchedule() {
            this.resetGame();
            this.raceSchedule = [...RaceSchedule]
            this.gameStatus = GameStatus.READY
        },

        startRace() {
            if (
                this.gameStatus !== GameStatus.READY &&
                this.gameStatus !== GameStatus.RACING
            )
                return

            if (this.gameStatus === GameStatus.READY || this.currentRound === 0) {
                this.currentRound = 1
                this.runRace(1)
            } else if (!this.isRacing && this.currentRound < 6) {
                this.currentRound++
                this.runRace(this.currentRound)
            }
        },

        pauseRace() {
            this.isPaused = true
            this.isRacing = false
            if (this.animationFrameId !== null) {
                cancelAnimationFrame(this.animationFrameId)
                this.animationFrameId = null
            }
        },

        resumeRace() {
            if (!this.isPaused || this.currentRound === 0) return
            this.isPaused = false
            this.isRacing = true
            this.runRace(this.currentRound, true) // resume from the current round
        },

        async runRace(roundNumber: number, isSelected: boolean = false) {
            const horsesStore = useHorseStore()
            if (roundNumber > 6) {
                this.gameStatus = GameStatus.FINISHED
                return
            }

            this.isRacing = true
            this.gameStatus = GameStatus.RACING
            this.elapsedTime = this.elapsedTime || 0

            const currentRace = this.raceSchedule[roundNumber - 1]

            let horsesWithFinishTimes: Array<Horse>

            if (isSelected) {
                horsesWithFinishTimes = horsesStore.selectedHorses;
            } else {
                const selectedHorses = horsesStore.selectHorsesForRace()
                horsesWithFinishTimes = selectedHorses.map((horse) =>
                    calculateRaceMovement(horse, currentRace.distance)
                )
            }

            let startTime: number | null = null

            const animate = (timestamp: number) => {
                if (this.isPaused) return

                if (!startTime) startTime = timestamp - this.elapsedTime
                this.elapsedTime = timestamp - startTime

                const progress = Math.min(this.elapsedTime / GameSettings.animationDuration, 1)

                const updatedHorses = horsesWithFinishTimes.map((horse) => {
                    const maxFinish = Math.max(
                        ...horsesWithFinishTimes.map((h) => h.finishTime!)
                    )
                    const relativeSpeed = 1 - horse.finishTime! / maxFinish
                    const horseProgress = progress * (1.2 + relativeSpeed * 0.3)

                    return {
                        ...horse,
                        position: Math.min(horseProgress * 100, 100),
                    }
                })

                horsesStore.updateHorsePosition(updatedHorses)

                if (progress < 1) {
                    this.animationFrameId = requestAnimationFrame(animate)
                } else {
                    this.animationFrameId = null
                    this.isRacing = false
                    this.elapsedTime = 0

                    const roundResults: RaceRound = {
                        round: roundNumber,
                        distance: currentRace.distance,
                        label: currentRace.label,
                        status: StatusRound.COMPLETED,
                        results: horsesWithFinishTimes,
                    }

                    this.raceSchedule[roundNumber - 1] = roundResults

                    if (roundNumber < 6) {
                        setTimeout(() => {
                            this.currentRound++
                            this.runRace(this.currentRound)
                        }, GameSettings.nextRound)
                    } else {
                        this.gameStatus = GameStatus.FINISHED
                    }
                }
            }

            const runAnimation = () => {
                this.animationFrameId = requestAnimationFrame(animate)
            }

            runAnimation()
        },

        resetGame() {
            const horsesStore = useHorseStore()
            horsesStore.generateHorses()
            this.raceSchedule = []
            this.currentRound = 0
            this.isRacing = false
            this.isPaused = false
            this.gameStatus = GameStatus.IDLE
            if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId)
            this.animationFrameId = null
            this.elapsedTime = 0
            horsesStore.resetHorses()
        },
    },
})
