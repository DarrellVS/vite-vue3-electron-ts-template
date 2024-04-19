<script setup lang="ts">
import DynamicLayoutRenderer from './DynamicLayoutRenderer.vue';
import { useElectron } from '../../composables/UseElectron'

const { emit } = useElectron();
</script>

<template>
    <div class="flex flex-col min-h-screen bg-white dark:bg-slate-900">
        <nav class="h-12 fixed left-0 top-0 right-0" :class="$style['draggable-nav']">
            <div class="justify-end flex">
                <div class="p-4 backdrop-blur rounded-bl-lg flex gap-x-4 h-12 bg-white/50 dark:bg-slate-900 backdrop-blur rounded-bl-lg">
                    <button class="aspect-square rounded-full bg-red-500" :class="$style['control']" @click="emit('closeWindow')" />
                    <button class="aspect-square rounded-full bg-orange-500" :class="$style['control']"  @click="emit('minimizeWindow')" />
                    <button class="aspect-square rounded-full bg-green-500" :class="$style['control']"  @click="emit('maximizeWindow')" />
                </div>
            </div>
        </nav>

        <main class="flex-1 flex flex-col mt-12">
            <DynamicLayoutRenderer>
                <slot />
            </DynamicLayoutRenderer>
        </main>
    </div>
</template>

<style module>
.draggable-nav {
    -webkit-user-select: none;
    -webkit-app-region: drag;
}

.control {
    -webkit-app-region: no-drag;
}
</style>