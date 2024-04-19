<script setup lang="ts">
import { computed } from 'vue';
import { type SidebarItem } from '../../../../types/navigation';
import SidebarNestedItem from './SidebarNestedItem.vue';
import { PhCaretDown } from '@phosphor-icons/vue';

const props = defineProps<{
    sidebarItem: SidebarItem;
    collapsedItems: string[];
}>();

const emit = defineEmits<{
    (eventName: 'update:collapsedItems', value: string[]): void;
}>();

const isCollapsed = computed(() => props.collapsedItems.includes(props.sidebarItem.title));

const toggleCollapsed = () => {
    if (isCollapsed.value) {
        emit('update:collapsedItems', props.collapsedItems.filter(item => item !== props.sidebarItem.title));
    } else {
        emit('update:collapsedItems', [...props.collapsedItems, props.sidebarItem.title]);
    }
};

const hasItems = computed(() => props.sidebarItem.items);
</script>

<template>
    <div>
        <div class="px-6 py-2 flex justify-between text-gray-700 dark:text-white">
            <span class="text-sm font-medium">
                {{ sidebarItem.title }}
            </span>

            <button 
                v-if="hasItems" 
                @click="toggleCollapsed"
            >
                <PhCaretDown 
                    weight="bold"
                    class="transition-transform duration-200 ease-in-out"
                    :class="isCollapsed ? 'transform rotate-180' : 'transform rotate-0'" 
                />
            </button>
        </div>

        <div class="flex flex-col gap-y-1 overflow-hidden transition-all" :class="isCollapsed ? 'max-h-0' : 'max-h-[160px]'">
            <SidebarNestedItem v-for="item in sidebarItem.items" :key="item.route" :sidebar-item="item" />
        </div>
    </div>
</template>