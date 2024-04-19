<script setup lang="ts">
import Input from '@/components/shadcn/ui/input/Input.vue'
import { useVModel } from '@vueuse/core';

const properties = defineProps<{
    placeholder?: string;
    modelValue: string;
}>()

const emit = defineEmits<{
    (eventName: 'update:modelValue', value: string): void
}>()

const model = useVModel(properties, 'modelValue', emit)
</script>

<template>
    <Input class="border-gray-400 placeholder:text-gray-400" :placeholder="placeholder" v-model="model" />
</template>