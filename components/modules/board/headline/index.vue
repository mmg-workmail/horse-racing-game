<script setup lang="ts">

    const props = withDefaults(
        defineProps<{
            title: string;
        }>(),
        {}
    );

</script>
<template>
    <div class="headline">
        <div class=" bg-slate-500 text-white p-0.5 rounded text-center">
            <h2>{{ title }}</h2>
        </div>
    </div>  
</template>