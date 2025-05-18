<script setup lang="ts">

    const {
        allHorses,
        generateHorses
    } = useHorses()
 
    generateHorses()

</script>

<template>
    <div class="h-full bg-gray-200 p-3 rounded-md flex flex-col gap-3">
        <div class="grid grid-cols-12">
            <div class="col-span-6">Name</div>
            <div class="col-span-4 text-center">Condition</div>
            <div class="col-span-2 text-center">Color</div>
        </div>
        <div class="h-[calc(100vh-125px)] overflow-scroll flex flex-col gap-0.5">
            <ScreensGameHorseListItem v-for="(item, index) of allHorses" :id="item.id" :key="index" :name="item.name" :condition="item.condition" :color="item.color" />
        </div>
    </div>
</template>