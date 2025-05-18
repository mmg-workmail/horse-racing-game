<script setup lang="ts">

    const props = withDefaults(
        defineProps<{
            name: string;
            color: string;
            id: number;
            condition: number;
        }>(),
        {}
    );

    const { selectedHorses } = useHorses();

    const isRacing = computed(() => selectedHorses.value.findIndex((h) => h.id === props.id ) >= 0)    

</script>

<template>
    <div class="grid grid-cols-12 items-center rounded-md px-1 py-0.5" :class="{'bg-slate-300': isRacing}">
        <div class="col-span-6">{{ name }}</div>
        <div class="col-span-4 text-center">{{ condition }}</div>
        <div class="col-span-2 flex justify-center">
            <ModulesBoxColor :color="color" />
        </div>
    </div>
</template>