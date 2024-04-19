<script setup lang="ts">
import { bottomSidebarItems, sidebarItems } from '../../../../constants/sidebar-items';
import SidebarItem from './SidebarItem.vue';
import { useLocalStorage } from '@vueuse/core';

const navigationStore = useLocalStorage<string[]>('collapsedNavigationItems', []);
</script>

<template>
    <div class="flex flex-col w-64 h-screen fixed bg-white dark:bg-slate-900 top-0 shadow-2xl">
        <div class="flex items-center justify-center my-10">
            <span class="text-xl font-medium dark:text-white">
                <span class="text-blue-600 dark:text-blue-400">Tag</span>cellent
            </span>
        </div>

        <div class="flex flex-col flex-1 gap-y-4">
            <SidebarItem 
                v-for="(item, index) in sidebarItems"
                :key="index"
                :sidebar-item="item"
                v-model:collapsed-items="navigationStore"
            />
        </div>

        <hr class="mb-5">

        <div class="flex flex-col mb-6 gap-y-4">
            <SidebarItem 
                v-for="(item, index) in bottomSidebarItems"
                :key="index"
                :sidebar-item="item"
                v-model:collapsed-items="navigationStore"
            />
        </div>
    </div>
</template>