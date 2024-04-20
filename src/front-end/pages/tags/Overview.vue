<script setup lang="ts">
import CreateTagModal from '@/components/app/CreateTagModal.vue';
import BaseHeading from '@/components/base/BaseHeading.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useTags } from '@/composables/UseTags';
import { useElectron } from '@/composables/UseElectron';
import { addBadgeFields } from '@/helpers/tagsHelpers';
import Badge from '@/components/shadcn/ui/badge/Badge.vue';
import { useFlatTags } from '@/composables/UseFlatTags';
import { PhArrowBendDownRight } from '@phosphor-icons/vue';

const tags = useFlatTags(useTags());
const isModalOpen = ref(false);
const routeQuery = useRoute().query

const { emit } = useElectron();

const tagOptions = addBadgeFields(tags);

onMounted(async () => {
    if (routeQuery?.new) isModalOpen.value = true
});

const deleteTag = async (tagId: number) => {
    await emit('tags_deleteTag', tagId);
};
</script>

<template>
    <div>
        <BaseHeading class="mb-10">
            Tags
        </BaseHeading>

        <table class="w-full text-gray-700 text-left rounded-lg overflow-hidden">
            <thead class="bg-gray-200 ">
                <tr>
                    <th class="px-6 py-2">Tag</th>
                    <th class="px-6 py-2" />
                </tr>
            </thead>
            <tbody>
                <tr v-for="tag in tagOptions" :key="tag.id" class="bg-gray-100">
                    <td class="px-6 py-2 flex items-center gap-x-4">
                        <PhArrowBendDownRight v-if="tag.indentLevel > 0" :style="{
                    marginLeft: `${(tag.indentLevel) * 20}px`,
                }" />
                        <Badge :class="[
                    tag.textColor,
                    tag.badgeColor,
                ]">
                            {{ tag.name }}
                        </Badge>
                    </td>
                    <td>
                        <!-- <button @click="isModalOpen = true">Edit</button> -->
                        <button @click="deleteTag(tag.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <CreateTagModal v-if="isModalOpen" :existing-tags="tags" @close="isModalOpen = false" />
    </div>
</template>