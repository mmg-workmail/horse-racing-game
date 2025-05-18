import { storeToRefs } from 'pinia'
import { useHorseStore } from '~/stores/modules/horse/horse'
import type { Horse } from '~/interfaces/horse'

export const useHorses = () => {
    const horseStore = useHorseStore()

    const {
        getAllHorses,
        getSelectedHorses
    } = storeToRefs(horseStore)

    const generateHorses = () => {
        horseStore.generateHorses()
    }

    const selectHorsesForRace = (): Horse[] => {
        return horseStore.selectHorsesForRace()
    }

    const updateHorsePosition = (horses: Horse[]) => {
        horseStore.updateHorsePosition(horses)
    }

    const resetHorses = () => {
        horseStore.resetHorses()
    }

    return {
        allHorses: getAllHorses,
        selectedHorses: getSelectedHorses,

        generateHorses,
        selectHorsesForRace,
        updateHorsePosition,
        resetHorses
    }
}
