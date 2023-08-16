<template>
    <div class="button">
        <button @click="$emit('onClicked')">{{ label }}</button>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    label: string
}>()

</script>

<style scoped lang="scss">

button {
    cursor: pointer;
    border: none;
    color: var(--c-white);
    border-radius: 2px;
    padding: 10px 20px;
    background-color: var(--c-blue);
    transition: background .25s;

    &:hover {
        background-color: var(--c-blue-dark);
    }
}

</style>