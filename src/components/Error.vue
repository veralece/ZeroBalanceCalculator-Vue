<script setup lang="ts">
const props = defineProps<{ shouldDisplay: boolean }>();
</script>
<template>
    <p :class="`error-message ${shouldDisplay ? 'display' : ''}`" :aria-hidden="!shouldDisplay">
        <slot></slot>
    </p>
</template>