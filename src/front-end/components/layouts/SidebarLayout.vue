<script setup lang="ts">
import SidebarNavigation from '../app/navigation/SidebarNavigation.vue';
</script>

<template>
    <div class="flex-1 flex">
        <SidebarNavigation /> 
        <div class="flex-1 ml-64 px-12">
            <slot />
        </div>
    </div>
</template>