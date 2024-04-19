<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    value: string;
    modelValue: string;
}>();

const emit = defineEmits<{
    (eventName: 'update:modelValue', value: string): void;
}>();

const model = computed({
    get: () => props.modelValue,
    set: (value: string) => emit('update:modelValue', value),
}); 
</script>

<template>
    <div>
        <label class="flex items-center space-x-2">
            <input type="radio" :value="value" v-model="model" />
            <span>
                <slot />
            </span>
        </label>
    </div>
</template>