import { HorseNames } from "~/constants/horse-names";
import type { Horse } from "~/interfaces/horse";
import { getRandomColor } from "~/utils/color";

export const useHorseStore = defineStore('horse', {
    state: () => ({
        allHorses: [] as Horse[],
        selectedHorses: [] as Horse[]
    }),

    getters: {
        getAllHorses: (state) => state.allHorses,
        getSelectedHorses: (state) => state.selectedHorses
    },

    actions: {
        generateHorses() {
            const getColor = getRandomColor();
            const horses: Horse[] = [];
            const horseNames = HorseNames

            for (let i = 0; i < 20; i++) {
                horses.push({
                    id: i + 1,
                    name: horseNames[i],
                    condition: Math.floor(Math.random() * 100) + 1,
                    color: getColor(),
                    position: 0,
                    isSelected: false,
                    finishTime: null
                });
            }

            this.allHorses = horses;
        },

        selectHorsesForRace() {
            const shuffled = [...this.allHorses].sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 10).map(horse => ({
                ...horse,
                isSelected: true,
                position: 0,
                finishTime: null
            }));

            this.selectedHorses = selected;
            return selected;
        },

        updateHorsePosition(horses: Array<Horse>) {
            this.selectedHorses = horses;
        },

        resetHorses() {
            this.selectedHorses = [];
        }
    }
});