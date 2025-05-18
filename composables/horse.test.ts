import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { useHorses } from '~/composables/horse'

// ✅ Move mock return data OUTSIDE
const mockAllHorses = ref([{ id: 1, name: 'Shadow Runner' }])
const mockSelectedHorses = ref([{ id: 1, name: 'Shadow Runner', isSelected: true }])
const mockGenerateHorses = vi.fn()
const mockSelectHorsesForRace = vi.fn().mockReturnValue([{ id: 2, name: 'Golden Gallop' }])
const mockUpdateHorsePosition = vi.fn()
const mockResetHorses = vi.fn()

// ✅ Declare the mock FIRST (at top level)
vi.mock('~/stores/modules/horse/horse', () => {
    return {
        useHorseStore: () => ({
            getAllHorses: mockAllHorses,
            getSelectedHorses: mockSelectedHorses,
            generateHorses: mockGenerateHorses,
            selectHorsesForRace: mockSelectHorsesForRace,
            updateHorsePosition: mockUpdateHorsePosition,
            resetHorses: mockResetHorses
        })
    }
})

describe('useHorses composable', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('returns allHorses and selectedHorses refs', () => {
        const horses = useHorses()
        expect(horses.allHorses.value[0].name).toBe('Shadow Runner')
        expect(horses.selectedHorses.value[0].isSelected).toBe(true)
    })

    it('calls generateHorses', () => {
        const horses = useHorses()
        horses.generateHorses()
        expect(mockGenerateHorses).toHaveBeenCalled()
    })

    it('selects horses and returns them', () => {
        const horses = useHorses()
        const selected = horses.selectHorsesForRace()
        expect(mockSelectHorsesForRace).toHaveBeenCalled()
        expect(selected[0].name).toBe('Golden Gallop')
    })

    it('updates horse position', () => {
        const horses = useHorses()
        const dummy = [{ id: 3, name: 'Thunderbolt', isSelected: true, position: 0, color: '#000', condition: 90, finishTime: null }]
        horses.updateHorsePosition(dummy)
        expect(mockUpdateHorsePosition).toHaveBeenCalledWith(dummy)
    })

    it('resets horses', () => {
        const horses = useHorses()
        horses.resetHorses()
        expect(mockResetHorses).toHaveBeenCalled()
    })
})
