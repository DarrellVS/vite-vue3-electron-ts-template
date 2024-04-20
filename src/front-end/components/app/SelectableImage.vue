<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const properties = defineProps<{
    src: string;
    modelValue: boolean;
    selectionEnabled: boolean;
}>()

const emit = defineEmits<{
    (eventName: 'update:modelValue', value: boolean): void
}>()

const model = useVModel(properties, 'modelValue', emit)
</script>

<template>
    <div class="relative">
        <img 
            :src="properties.src"
            class="w-full rounded-lg"
            loading="lazy"
        />
        <template v-if="selectionEnabled">
            <div 
                v-if="properties.modelValue"
                class="absolute inset-0 bg-indigo-500/50 rounded-lg ring ring-indigo-700"
            />
            <input 
                type="checkbox"
                v-model="model"
                class="absolute inset-0 opacity-0 cursor-pointer"
            />
        </template>
    </div>
</template>