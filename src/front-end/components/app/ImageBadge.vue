<script setup lang="ts">
import { Tag } from '../../../types/stores';
import { computed } from 'vue';
import { tagColors } from '../../../constants/tag-colors';
import Badge from '@/components/shadcn/ui/badge/Badge.vue';

const properties = defineProps<{
    tags: Tag[];
    tagId: number;
}>();

const tag = computed(() => properties.tags.find((tag) => tag.id === properties.tagId));
const color = computed(() => tagColors.find((color) => color.id === tag.value?.colorOption))
</script>

<template>
    <Badge variant="default" :class="[
        color?.bg,
        color?.text,
    ]">
        {{ tag?.name }}
    </Badge>
</template>