<script setup lang="ts">
defineProps<{
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}>()

const classMap = {
    h1: 'text-4xl font-bold text-slate-800 dark:text-slate-100',
    h2: 'text-3xl font-bold text-slate-800 dark:text-slate-100',
    h3: 'text-2xl font-bold text-slate-800 dark:text-slate-100',
    h4: 'text-xl font-bold text-slate-800 dark:text-slate-100',
    h5: 'text-lg font-bold text-slate-800 dark:text-slate-100',
    h6: 'text-base font-bold text-slate-800 dark:text-slate-100',
}
</script>

<template>
    <component :is="variant" :class="classMap[variant]">
        <slot />
    </component>
</template>