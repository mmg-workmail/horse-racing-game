<template>
    <button class="btn">
        <slot />
    </button>
</template>

<style scoped>

.btn{
    @apply border-0 bg-gray-500 rounded-md py-1 px-5 block text-white disabled:bg-gray-300 focus:bg-gray-600
}

</style>