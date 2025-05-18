// tests/unit/stores/horse.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
// import { setupTest } from '@nuxt/test-utils/integration'
import { useHorseStore } from '~/stores/modules/horse/horse'
import { createPinia, setActivePinia } from 'pinia'

// Mock color generator
vi.mock('~/utils/color', () => ({
    getRandomColor: () => () => '#ff0000'
}))

// await setupTest({
//     browser: false
// })

describe('Horse Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('generates 20 horses', () => {
        const store = useHorseStore()
        store.generateHorses()
        expect(store.allHorses.length).toBe(20)
        expect(store.allHorses[0].color).toBe('#ff0000')
    })

    it('selects 10 horses', () => {
        const store = useHorseStore()
        store.generateHorses()
        store.selectHorsesForRace()
        expect(store.selectedHorses.length).toBe(10)
        expect(store.selectedHorses.every(h => h.isSelected)).toBe(true)
    })

    it('updates horse position', () => {
        const store = useHorseStore()
        store.generateHorses()
        const selected = store.selectHorsesForRace()
        const updated = selected.map((h, i) => ({ ...h, position: i * 10 }))
        store.updateHorsePosition(updated)
        expect(store.selectedHorses[1].position).toBe(10)
    })

    it('resets horses', () => {
        const store = useHorseStore()
        store.generateHorses()
        store.selectHorsesForRace()
        store.resetHorses()
        expect(store.selectedHorses.length).toBe(0)
    })
})
