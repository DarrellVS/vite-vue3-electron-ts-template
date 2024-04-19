<script setup lang="ts">
withDefaults(defineProps<{
    variant: 'primary' | 'secondary' | 'tertiary';
}>(), {
    variant: 'primary',
});

const classMap = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white',
    tertiary: 'bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white',
}
</script>

<template>
    <button class="rounded-lg px-6 py-3 text-sm" :class="classMap[variant]">
        <slot />
    </button>
</template>