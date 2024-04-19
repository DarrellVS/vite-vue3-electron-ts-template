<script setup lang="ts">
import BaseHeading from '../../components/base/BaseHeading.vue';
import BaseInput from '../../components/base/input/BaseInput.vue';
import BaseRadio from '../../components/base/input/BaseRadio.vue';
import { watch } from 'vue';
import { useLocalStorage } from '@vueuse/core';

const themeModel = useLocalStorage<string>('theme', 'light');

watch(themeModel, (value) => {
    document.documentElement.classList[value === 'dark' ? 'add' : 'remove']('dark');
});
</script>

<template>
    <div>
        <BaseHeading variant="h1" class="mb-10">Appearance</BaseHeading>
        <BaseInput>
            <template #label>
                <span>App theme</span>
            </template>

            <BaseRadio value="light" v-model="themeModel">Light</BaseRadio>
            <BaseRadio value="dark" v-model="themeModel">Dark</BaseRadio>
        </BaseInput>
    </div>
</template>