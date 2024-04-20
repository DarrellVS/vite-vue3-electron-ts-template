<script setup lang="ts">
import { onMounted, onUnmounted, ref, watchEffect } from 'vue';
import BaseHeading from '@/components/base/BaseHeading.vue';
import BaseCheckbox from '@/components/base/input/BaseCheckbox.vue';
import BaseCombobox from '@/components/base/BaseCombobox.vue';
import { ImagesStateStoreState } from '../../types/stores';
import { useElectron } from '@/composables/UseElectron';
import SelectableImage from '@/components/app/SelectableImage.vue';
import { useTags } from '@/composables/UseTags';
import { mapTagsToComboboxOptions } from '@/helpers/tagsHelpers';
import BaseButton from '@/components/base/BaseButton.vue';
import ImageBadge from '@/components/app/ImageBadge.vue';
import { useFlatTags } from '@/composables/UseFlatTags';

const { emit } = useElectron();
const state = ref<ImagesStateStoreState>();
const tags = useFlatTags(useTags());
const selectedTags = ref<number[]>([]);

const tagOptions = mapTagsToComboboxOptions(tags);

const checkSelectedTags = (tags: number[]) => {
    tags.forEach((tag) => {
        if (!selectedTags.value.includes(tag)) {
            selectedTags.value.push(tag);
        }
    });
};

onMounted(async () => {
    const requestedState = await emit('images_getState');
    state.value = requestedState;
});

const columns = ref(1);
const minColWidth = 300;

const updateColumns = () => {
    const width = window.innerWidth;
    columns.value = Math.floor(width / minColWidth);
    if (columns.value > 5) {
        columns.value = 5;
    }
};
updateColumns();

window.addEventListener('resize', updateColumns);

onUnmounted(() => {
    window.removeEventListener('resize', updateColumns);
});

const selectedImages = ref<string[]>([]);
const selectionEnabled = ref(false);

watchEffect(() => {
    if (!selectionEnabled.value) {
        selectedImages.value = [];
        selectedTags.value = [];
    }
});

const submit = async () => {
    await emit('tags_setTags', {
        imagePaths: [...selectedImages.value],
        tagIds: [...selectedTags.value],
    });

    state.value = await emit('images_getState')

    selectionEnabled.value = false;
}
</script>

<template>
    <BaseHeading variant="h1" class="mb-10">
        Images
    </BaseHeading>

    <div class="mb-4 flex items-center justify-between min-h-[3rem]">
        <BaseCheckbox v-model="selectionEnabled">
            Select multiple images
        </BaseCheckbox>
        <div v-if="selectionEnabled && selectedImages.length > 0" class="flex items-center gap-x-4">
            <BaseCombobox v-model="selectedTags" :options="tagOptions" />
            <BaseButton variant="secondary" @click="submit">
                Apply tags
            </BaseButton>
        </div>
    </div>

    <div :style="{
            columns: `${columns}`,
        }">
        <template v-if="state">
            <div v-for="(file, index) in state.entries" :key="index" class="mb-4">
                <SelectableImage :selection-enabled="selectionEnabled" :src="file.path"
                    :model-value="selectedImages.includes(file.path)" @update:model-value="value => {
            if (value) {
                selectedImages.push(file.path);
                checkSelectedTags(file.tags);
            } else {
                selectedImages = selectedImages.filter((path) => path !== file.path);
            }
        }" />
                <div v-if="file.tags.length > 0" class="flex flex-wrap gap-1 mt-1">
                    <ImageBadge v-for="tag in file.tags" :key="tag" :tags="tags" :tag-id="tag" />
                </div>
            </div>
        </template>
    </div>
</template>