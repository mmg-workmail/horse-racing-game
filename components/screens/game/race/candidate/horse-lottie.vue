<script setup lang="ts">
    import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
    const { isRacing, isPaused } = useRace();

    const props = withDefaults(
        defineProps<{
            position: number;
        }>(),
        {}
    );      
    
</script>
<template>
    <div class="scale-x-[-1]">
        <DotLottieVue
            src="https://lottie.host/6468c69d-3eab-4ab3-afbe-83843a0dc3de/IA6WR7ni6E.lottie"
            background="transparent"
            :speed="!isPaused && position < 100 ? 2.5 : 0.00001"
            style="width: 60px; height: 50px"
            loop
            autoplay
            class="grayscale transition-all duration-500"
            :class="{'opacity-0' : !isRacing && !isPaused}"
        /> 
    </div>
</template>