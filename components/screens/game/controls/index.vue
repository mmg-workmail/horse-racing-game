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
    <div class="flex justify-between md:gap-2 gap-0.5">
        
        <div class="flex items-center md:gap-2 gap-1">
            <h3 class="md:text-xl text-xs font-bold"> Current Round: {{ currentRound }} </h3>
            <span> / </span>
            <strong class="md:text-base text-xs" :class="{'text-red-600' : gameStatus === GameStatus.FINISHED}">{{ gameStatus }}</strong>
        </div>

        <div class="flex md:gap-2 gap-1 justify-end">
            <ModulesBtn class="" @click="generateRaceSchedule" >Race Schedule</ModulesBtn>

            <ModulesBtn v-if="isRacing" @click="pauseRace" >Pause Race</ModulesBtn>
            <ModulesBtn v-else-if="isPaused" @click="resumeRace" >Resume Race</ModulesBtn>
            <ModulesBtn v-else @click="startRace" >Start Race</ModulesBtn>
            
        </div>

    </div>
</template>