<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import BaseHeading from '@/components/base/BaseHeading.vue';
import { ImagesStateStoreState } from '../../types/stores';
import { useElectron } from '@/composables/UseElectron';

const { emit } = useElectron();
const state = ref<ImagesStateStoreState>();

onMounted(async () => {
    const requestedState = await emit('images_getState');
    state.value = requestedState;
});

// Dynamically determine column width based on screen size
const columns = ref(1);

// Min col width
const minColWidth = 300;

// Update columns based on screen size
const updateColumns = () => {
    const width = window.innerWidth;
    columns.value = Math.floor(width / minColWidth);
    if (columns.value > 5) {
        columns.value = 5;
    }
};

// Update columns on load
updateColumns();

// Update columns on resize
window.addEventListener('resize', updateColumns);

// Cleanup
onUnmounted(() => {
    window.removeEventListener('resize', updateColumns);
});
</script>

<template>
    <BaseHeading variant="h1" class="mb-10">Images</BaseHeading>

    <div :style="{
        columns: `${columns}`,
    }">
        <template v-if="state">
            <div
                v-for="(file, index) in state.entries" 
                :key="index" 
                class="mb-4"
            >
                <img 
                    :src="file.path" 
                    class="rounded-lg"
                    loading="lazy"
                >
            </div>
        </template>
    </div>
</template>