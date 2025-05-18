<script setup lang="ts">
    import type { Horse } from '~/interfaces/horse';

    const props = defineProps<{
        horse: Horse
    }>()

</script>

<template>
    <div class="relative h-10 border-b border-green-500 flex items-center">

        <div class="horse">
            <div class="absolute rounded-full bottom-0 -ml-[60px]" :style="{left : `${horse.position}%`}">
                <ClientOnly>
                    <ScreensGameRaceCandidateHorseLottie :position="horse.position" />
                </ClientOnly>
                <ScreensGameRaceCandidateName :name="horse.name" :color="horse.color" />
            </div>
        </div>

    </div>
</template>
