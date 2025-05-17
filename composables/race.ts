import { storeToRefs } from 'pinia';
import { useRaceStore } from '~/stores/race';

export const useRace = () => {
    const raceStore = useRaceStore();
    const { horses, schedule, results, currentRound } = storeToRefs(raceStore);

    return {
        horses,
        schedule,
        results,
        currentRound,
        generateHorses: raceStore.generateHorses,
        generateSchedule: raceStore.generateSchedule,
        startRace: raceStore.startRace
    };
};
