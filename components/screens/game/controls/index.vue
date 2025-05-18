<script setup lang="ts">
    import { GameStatus } from '~/enums/game';

    const {
        currentRound,
        isRacing,
        isPaused,
        generateRaceSchedule,
        startRace,
        pauseRace,
        resumeRace,
        gameStatus
    } = useRace()

</script>

<template>
    <div class="flex justify-between  gap-2">
        
        <div class="flex items-center gap-2">
            <h3 class="text-xl font-bold"> Current Round: {{ currentRound }} </h3>
            <span> / </span>
            <strong :class="{'text-red-600' : gameStatus === GameStatus.FINISHED}">{{ gameStatus }}</strong>
        </div>

        <div class="flex gap-2 justify-end">
            <ModulesBtn class="" @click="generateRaceSchedule" >Race Schedule</ModulesBtn>

            <ModulesBtn v-if="isRacing" @click="pauseRace" >Pause Race</ModulesBtn>
            <ModulesBtn v-else-if="isPaused" @click="resumeRace" >Resume Race</ModulesBtn>
            <ModulesBtn v-else @click="startRace" >Start Race</ModulesBtn>
            
        </div>

    </div>
</template>