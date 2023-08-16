<template>
    <div class="cards">
        <div class="cards__row" v-for="(row, rowIndex) in grid.items" :key="rowIndex">
            <div class="cards__col card" 
            v-for="(colValue, colIndex) in row" 
            :class="[`--${colValue}`, { '--active': grid.revealed[rowIndex][colIndex] }]"
            :key="colIndex" 
            @click="handleClick(rowIndex, colIndex)"
            >
            <div class="card-box">
                <span class="card-box__back">{{ colValue }}</span>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { GridCell, TGridTemplate } from '@/helpers/types'
import { sleep } from '@/helpers'
import { useState } from '@/composables/useState'
import { useEventBus } from '@/composables/useEventBus'

const gridTemplate: TGridTemplate<number> = [
  [0, 1, 3, 5],
  [1, 5, 4, 2], 
  [2, 0, 4, 3],
]

const prevClick = ref<GridCell | undefined>()
const grid = reactive({ 
  items: shuffleGrid(gridTemplate),
  revealed: [] as TGridTemplate<boolean>
})

const { state, handleSolved } = useState()
const { $on } = useEventBus()

clearRevealedGrid()
$on('restart', () => handleRestart())

function handleClick(row: number, col: number) {
  if (grid.revealed[row][col]) return

  const clickedNumber = grid.items[row][col]
  const updateRevealedGrid = [...grid.revealed]
  updateRevealedGrid[row][col] = true

  if (prevClick.value) {
    const prevClickedNumber = grid.items[prevClick.value.row][prevClick.value.col]
    
    if (prevClickedNumber !== clickedNumber) {
      const { row: prevRow, col: prevCol } = prevClick.value

      setTimeout(() => {
        updateRevealedGrid[row][col] = false
        updateRevealedGrid[prevRow][prevCol] = false
        grid.revealed = [...updateRevealedGrid]
        prevClick.value = undefined
      }, 500)

    } else {
      prevClick.value = undefined
    }

  } else {
    prevClick.value = { row, col }
  }

  const isSolved = grid.revealed.flat().every((x: boolean ) => x)  
  handleSolved(isSolved)

  if (state.solved) {
    setTimeout(() => {
      alert('Hurray, you won 🎉🎉🎉')
    }, 200)
  }
}

async function handleRestart() {
  prevClick.value = undefined
  clearRevealedGrid()
  handleSolved(false)
  
  await sleep(200)
  grid.items = shuffleGrid(gridTemplate)
}

function clearRevealedGrid() {
  const [rows, cols] = [
    grid.items.length, 
    grid.items[0].length
  ]

  grid.revealed = Array.from({ length: rows }, () => 
    Array.from({ length: cols }, () => false)
  )
}

function shuffleGrid<T extends number[][]>(arr: T) {
    const updatedGrid = arr.map(subarray => 
      [...subarray].sort(() => Math.random() - 0.5)
    )
    for (let i = updatedGrid.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [updatedGrid[i], updatedGrid[j]] = [updatedGrid[j], updatedGrid[i]];
    }
    return updatedGrid
}

</script>

<style scoped lang="scss">

.cards {
  display: grid;
  gap: 10px;
  
  &__row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  &__col {
    perspective: 500px;

    &.--active {
      .card-box {
        transform: rotateY(180deg);
        transition: transform 0.5s;

        &__back { 
          opacity: 1;
        }
      }
    }
  }

  .card {
    &-box {
      width: 70px;
      height: 90px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-card-bg);
      border-radius: .25rem;
      transition: transform 1s;
      cursor: pointer;
  
      &__back {
        color: var(--color-card-text);
        font-size: 1.5rem;
        font-weight: bold;
        transition: opacity .5s ease .15s;
        opacity: 0; 
        transform: scaleX(-1);
        pointer-events: none;
      }
    }
  }
}

</style>