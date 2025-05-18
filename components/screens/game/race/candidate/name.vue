<script setup lang="ts">

    const { isRacing, isPaused } = useRace();

    const props = withDefaults(
        defineProps<{
            name: string;
            color: string;
        }>(),
        {}
    );    

</script>


<template>
    <span class="absolute right-full h-full top-0 whitespace-nowrap flex items-center">
        <span 
            class="text-xs bg-black/20 px-2 py-0.5 rounded-lg opacity-0 transition-all duration-500 delay-1000 text-white " 
            :class="{'!opacity-100' : isRacing || isPaused}"
            :style="{backgroundColor: color}"
        >
            <span class="bg-black/20 rounded-lg flex  px-1">
                {{ name }}
            </span>
        </span>
    </span>
</template>