import { defineStore } from 'pinia';
import type { Horse } from '~/interfaces/horse';
import type { Race } from '~/interfaces/race';

export const useRaceStore = defineStore('race', {
    state: () => ({
        settings: {
            horseCount: 20,
            roundLength: [1200, 1400, 1600, 1800, 2000, 2200]
        },

        horses: [] as Horse[],
        schedule: [] as Race[],
        currentRound: 0,
        results: [] as Race[],
    }),
    actions: {
        generateHorses() {
            const colors = generateColors(this.settings.horseCount);
            this.horses = Array.from({ length: this.settings.horseCount }, (item, i) => ({
                id: i + 1,
                name: `Horse ${i + 1}`,
                color: colors[i],
                condition: Math.floor(Math.random() * 100) + 1
            }));
        },
        generateSchedule() {
            this.schedule = this.settings.roundLength.map((length, i) => {
                const participants = [...this.horses].sort(() => 0.5 - Math.random()).slice(0, 10);
                return { round: i + 1, length, participants, result: [] };
            });
        },
        startRace() {
            this.currentRound = 0;
            this.results = [];
            this.nextRound();
        },
        async nextRound() {
            if (this.currentRound >= 6) return;
            const race = this.schedule[this.currentRound];
            const sorted = [...race.participants].sort((a, b) => (b.condition + Math.random() * 10) - (a.condition + Math.random() * 10));
            race.result = sorted;
            this.results.push(race);
            this.currentRound++;
            if (this.currentRound < 6) {
                setTimeout(() => this.nextRound(), 2000);
            }
        }
    }
});