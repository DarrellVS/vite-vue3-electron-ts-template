<script setup lang="ts">
import CreateTagModal from '@/components/app/CreateTagModal.vue';
import BaseHeading from '@/components/base/BaseHeading.vue';
import { useElectron } from '@/composables/UseElectron';
import { TagStoreState } from 'src/types/stores';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const { emit } = useElectron();
const state = ref<TagStoreState>();
const isModalOpen = ref(false);
const routeQuery = useRoute().query

onMounted(async () => {
    const requestedState = await emit('tags_getState');
    state.value = requestedState;

    if(routeQuery?.new) isModalOpen.value = true
});
</script>

<template>
    <div>
        <BaseHeading class="mb-10">
            Tags
        </BaseHeading>

        <CreateTagModal 
            v-if="isModalOpen"
            :existing-tags="state?.tags"
            @close="isModalOpen = false"
        />
    </div>
</template>