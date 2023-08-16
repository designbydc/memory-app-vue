<template>
  <main class="memory-game">
    <div class="memory-game__container">
      <h1><strong>Memory Game</strong></h1>
      <Cards />
      <Button v-if="state.solved" label="Restart" @onClicked="$emit('restart')" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useState } from '@/composables/useState'
import { useEventBus } from '@/composables/useEventBus'

import Cards from '@/components/Cards.vue'
import Button from '@/components/Button.vue'

const { state } = useState()
const { $emit } = useEventBus()

</script>

<style scoped lang="scss">

.memory-game {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  
  &__container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
  }

  h1 {
    color: var(--color-heading);
  }
}
</style>