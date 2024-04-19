<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useNavigation } from '../../../composables/UseNavigation';
import { computed } from 'vue';
import { type SidebarNestedItem } from '../../../../types/navigation';

const props = defineProps<{
    sidebarItem: SidebarNestedItem;
}>();

const { isRouteActive } = useNavigation();

const isActive = computed(() => isRouteActive(props.sidebarItem.route));
</script>

<template>
    <RouterLink 
        class="flex gap-x-3 rounded-lg text-gray-700 dark:text-white p-2 mx-6 items-center group transition-colors duration-200 ease-in-out"
        :class="isActive ? 'bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10' : 'after:bg-transparent hover:bg-gray-100 dark:hover:bg-white/5'"
        :to="sidebarItem.route"
    >
        <component :is="sidebarItem.icon" size="18" />
        <span class="text-sm" :class="isActive && 'font-medium'">
            {{ sidebarItem.title }}
        </span>
    </RouterLink>
</template>