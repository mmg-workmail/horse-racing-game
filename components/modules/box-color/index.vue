<script setup lang="ts">

    const props = withDefaults(
        defineProps<{
            color: string;
        }>(),
        {}
    );


</script>

<template>
    <div :style="{backgroundColor : color}" class="h-3 w-3 rounded" />
</template>