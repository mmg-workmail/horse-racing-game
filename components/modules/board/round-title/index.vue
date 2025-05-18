<script setup lang="ts">
import { StatusRound } from '~/enums/race';


    const props = withDefaults(
        defineProps<{
            status: StatusRound;
            label: string;
        }>(),
        {}
    );

</script>

<template>
    <div class="round-headline">
        <div 
            class="text-white py-0.5 px-2 rounded-sm text-sm flex justify-center" 
            :class="{
                'bg-red-800': status === StatusRound.PENDING,
                'bg-green-800': status === StatusRound.COMPLETED,
            }"
        >
            <span>{{ label }}</span>
        </div>
    </div>    
</template>