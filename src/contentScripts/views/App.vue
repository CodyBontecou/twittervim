<script setup lang="ts">
import { ref } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import CommandPalette from './CommandPalette.vue'
import type { Command } from './CommandPalette.vue'
import { useTwitterKeyboard } from '~/composables/useTwitterKeyboard'
import 'uno.css'

const showCommandPalette = ref(false)

// Initialize keyboard shortcuts
const { commands } = useTwitterKeyboard({
  isCommandPaletteOpen: () => showCommandPalette.value,
})

// Open command palette with cmd+shift+p or ctrl+shift+p
onKeyStroke(['p'], (e) => {
  if ((e.metaKey || e.ctrlKey) && e.shiftKey) {
    e.preventDefault()
    showCommandPalette.value = !showCommandPalette.value
  }
})

function handleCommandExecute(command: Command) {
  command.action()
}

function closeCommandPalette() {
  showCommandPalette.value = false
}
</script>

<template>
  <div>
    <!-- Command Palette -->
    <CommandPalette
      :commands="commands"
      :show="showCommandPalette"
      @close="closeCommandPalette"
      @execute="handleCommandExecute"
    />
  </div>
</template>
