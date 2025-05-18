<script setup lang="ts">

    const { raceResults } = useRace()

</script>

<template>
    <div class="flex flex-col gap-2">

        <ModulesBoardHeadline title="Result" />

        <div class="h-[calc(100vh-125px)] overflow-scroll">
            <div v-for="(item, index) of raceResults" :key="index" class="round">
                
                <ModulesBoardRoundTitle :label="item.label" :status="item.status" />

                <div class="round-body">
                    <div class="text-sm">
                        <ModulesBoardResultTitle />
                        <ModulesBoardItem 
                            v-for="(horse, index) of item.results" :key="index" 
                            :name="horse.name" :color="horse.color" :position="horse.position"
                        />
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>