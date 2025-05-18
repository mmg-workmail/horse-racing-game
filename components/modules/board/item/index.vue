<script setup lang="ts">

    const props = withDefaults(
        defineProps<{
            name: string;
            color: string;
            position: number;
        }>(),
        {}
    );


</script>

<template>
    <div class="grid grid-cols-12 items-center">
        <div class="col-span-3 flex gap-[2px] justify-start items-center">
            <ModulesBoxColor :color="color" />
            <div>{{ position }}</div>
        </div>
        <div class="col-span-9">{{ name }}</div>
    </div>
</template>