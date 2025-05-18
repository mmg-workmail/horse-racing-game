<script setup lang="ts">

    const { selectedHorses } = useHorses();
    const { currentRound, raceSchedule } = useRace();

</script>

<template>
    <div class="h-full bg-green-200 p-3 rounded-md overflow-hidden">
        <div class="flex flex-col justify-center h-full">
            <div class="flex flex-col gap-5">         
                <div v-for="(item, index) of selectedHorses" :key="index" class="flex">
                    <div class="w-12 flex justify-start items-center gap-2 text-lg">
                        <ModulesBoxColor :color="item.color" /> 
                        <span>{{ index + 1 }} </span>
                    </div>
                    <div class="col-auto grow">
                        <ScreensGameRaceCandidate :horse="item"  />
                    </div>
                </div>
            </div>
            <div class="flex justify-center pt-5">
                {{ raceSchedule[currentRound - 1]?.label }}
            </div>            
        </div>
    </div>
</template>