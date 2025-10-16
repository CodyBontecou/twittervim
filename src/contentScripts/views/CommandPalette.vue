<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'

export interface Command {
  id: string
  label: string
  description: string
  shortcut?: string
  action: () => void
  category: 'navigation' | 'tweet' | 'other'
}

interface Props {
  commands: Command[]
  show: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'execute', command: Command): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const searchInput = ref<HTMLInputElement>()
const commandListContainer = ref<HTMLElement>()
const searchQuery = ref('')
const selectedIndex = ref(0)
const lastMousePosition = ref({ x: 0, y: 0 })
const isKeyboardNavigation = ref(false)

// Filter commands based on search query
const filteredCommands = computed(() => {
  if (!searchQuery.value) {
    return props.commands
  }

  const query = searchQuery.value.toLowerCase()
  return props.commands.filter((cmd) => {
    const label = cmd.label.toLowerCase()
    const description = cmd.description.toLowerCase()
    const shortcut = cmd.shortcut?.toLowerCase() || ''

    return label.includes(query) || description.includes(query) || shortcut.includes(query)
  })
})

// Group commands by category
const groupedCommands = computed(() => {
  const groups: Record<string, Command[]> = {
    navigation: [],
    tweet: [],
    other: [],
  }

  filteredCommands.value.forEach((cmd) => {
    groups[cmd.category].push(cmd)
  })

  return groups
})

// Reset selected index when filtered commands change
watch(filteredCommands, () => {
  selectedIndex.value = 0
})

// Focus input when palette opens
watch(() => props.show, async (show) => {
  if (show) {
    searchQuery.value = ''
    selectedIndex.value = 0
    await nextTick()
    searchInput.value?.focus()
  }
})

// Keyboard navigation handler
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    isKeyboardNavigation.value = true
    selectedIndex.value = Math.min(selectedIndex.value + 1, filteredCommands.value.length - 1)
    scrollToSelected()
  }
  else if (e.key === 'ArrowUp') {
    e.preventDefault()
    isKeyboardNavigation.value = true
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
    scrollToSelected()
  }
  else if (e.key === 'Enter') {
    if (filteredCommands.value.length > 0) {
      e.preventDefault()
      executeCommand(filteredCommands.value[selectedIndex.value])
    }
  }
  else if (e.key === 'Escape') {
    e.preventDefault()
    emit('close')
  }
}

function handleMouseMove(e: MouseEvent) {
  const moved = e.clientX !== lastMousePosition.value.x || e.clientY !== lastMousePosition.value.y
  if (moved) {
    isKeyboardNavigation.value = false
    lastMousePosition.value = { x: e.clientX, y: e.clientY }
  }
}

function handleMouseEnter(command: Command) {
  if (!isKeyboardNavigation.value) {
    selectedIndex.value = filteredCommands.value.indexOf(command)
  }
}

function executeCommand(command: Command) {
  emit('execute', command)
  emit('close')
}

function scrollToSelected() {
  nextTick(() => {
    const selectedEl = commandListContainer.value?.querySelector('.command-item-selected') as HTMLElement
    if (!selectedEl)
      return

    // Use scrollIntoView for smooth, reliable scrolling
    selectedEl.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    })
  })
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    navigation: 'Navigation',
    tweet: 'Tweet Actions',
    other: 'Other',
  }
  return labels[category] || category
}
</script>

<template>
  <div
    v-if="show"
    class="command-palette-overlay"
    @click="emit('close')"
  >
    <div
      class="command-palette"
      @click.stop
    >
      <div class="command-palette-header">
        <input
          ref="searchInput"
          v-model="searchQuery"
          type="text"
          class="command-palette-input"
          placeholder="Type a command or search..."
          @keydown="handleKeydown"
        >
      </div>

      <div ref="commandListContainer" class="command-palette-content" @mousemove="handleMouseMove">
        <template v-if="filteredCommands.length === 0">
          <div class="no-results">
            No commands found
          </div>
        </template>

        <template v-else>
          <div class="command-columns">
            <!-- Left Column: Navigation -->
            <div class="command-column">
              <div
                v-if="groupedCommands.navigation.length > 0"
                class="command-category"
              >
                <div class="command-category-label">
                  {{ getCategoryLabel('navigation') }}
                </div>

                <div
                  v-for="command in groupedCommands.navigation"
                  :key="command.id"
                  class="command-item"
                  :class="{ 'command-item-selected': filteredCommands.indexOf(command) === selectedIndex }"
                  @click="executeCommand(command)"
                  @mouseenter="handleMouseEnter(command)"
                >
                  <div class="command-item-content">
                    <div class="command-item-label">
                      {{ command.label }}
                    </div>
                    <div class="command-item-description">
                      {{ command.description }}
                    </div>
                  </div>
                  <div
                    v-if="command.shortcut"
                    class="command-item-shortcut"
                  >
                    {{ command.shortcut }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column: Tweet Actions -->
            <div class="command-column">
              <div
                v-if="groupedCommands.tweet.length > 0"
                class="command-category"
              >
                <div class="command-category-label">
                  {{ getCategoryLabel('tweet') }}
                </div>

                <div
                  v-for="command in groupedCommands.tweet"
                  :key="command.id"
                  class="command-item"
                  :class="{ 'command-item-selected': filteredCommands.indexOf(command) === selectedIndex }"
                  @click="executeCommand(command)"
                  @mouseenter="handleMouseEnter(command)"
                >
                  <div class="command-item-content">
                    <div class="command-item-label">
                      {{ command.label }}
                    </div>
                    <div class="command-item-description">
                      {{ command.description }}
                    </div>
                  </div>
                  <div
                    v-if="command.shortcut"
                    class="command-item-shortcut"
                  >
                    {{ command.shortcut }}
                  </div>
                </div>
              </div>

              <!-- Other category goes in right column if present -->
              <div
                v-if="groupedCommands.other.length > 0"
                class="command-category"
              >
                <div class="command-category-label">
                  {{ getCategoryLabel('other') }}
                </div>

                <div
                  v-for="command in groupedCommands.other"
                  :key="command.id"
                  class="command-item"
                  :class="{ 'command-item-selected': filteredCommands.indexOf(command) === selectedIndex }"
                  @click="executeCommand(command)"
                  @mouseenter="handleMouseEnter(command)"
                >
                  <div class="command-item-content">
                    <div class="command-item-label">
                      {{ command.label }}
                    </div>
                    <div class="command-item-description">
                      {{ command.description }}
                    </div>
                  </div>
                  <div
                    v-if="command.shortcut"
                    class="command-item-shortcut"
                  >
                    {{ command.shortcut }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <div class="command-palette-footer">
        <span class="footer-hint">↑↓ to navigate</span>
        <span class="footer-hint">↵ to select</span>
        <span class="footer-hint">esc to close</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.command-palette-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 999999;
  padding-top: 10vh;
  backdrop-filter: blur(2px);
}

.command-palette {
  width: 900px;
  max-width: 90vw;
  background: #2d2d2d;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 70vh;
}

.command-palette-header {
  padding: 12px 16px;
  border-bottom: 1px solid #3e3e3e;
}

.command-palette-input {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: #cccccc;
  font-size: 15px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 4px 0;
}

.command-palette-input::placeholder {
  color: #808080;
}

.command-palette-content {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.command-columns {
  display: flex;
  gap: 0;
  min-height: 100%;
}

.command-column {
  flex: 1;
  padding: 0;
  position: relative;
}

.command-column:first-child {
  border-right: 1px solid #3e3e3e;
}

.command-category {
  margin-bottom: 8px;
}

.command-category-label {
  padding: 8px 16px 4px;
  font-size: 11px;
  font-weight: 600;
  color: #808080;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.command-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.1s;
  border-left: 2px solid transparent;
}

.command-item:hover,
.command-item-selected {
  background-color: #37373d;
  border-left-color: #007acc;
}

.command-item-content {
  flex: 1;
  min-width: 0;
}

.command-item-label {
  color: #cccccc;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 2px;
}

.command-item-description {
  color: #808080;
  font-size: 12px;
}

.command-item-shortcut {
  margin-left: 12px;
  padding: 2px 8px;
  background-color: #3e3e3e;
  border-radius: 4px;
  color: #cccccc;
  font-size: 11px;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace;
  white-space: nowrap;
}

.no-results {
  padding: 32px 16px;
  text-align: center;
  color: #808080;
  font-size: 13px;
}

.command-palette-footer {
  padding: 8px 16px;
  border-top: 1px solid #3e3e3e;
  display: flex;
  gap: 16px;
  font-size: 11px;
  color: #808080;
}

.footer-hint {
  display: flex;
  align-items: center;
}

/* Custom scrollbar */
.command-palette-content::-webkit-scrollbar {
  width: 10px;
}

.command-palette-content::-webkit-scrollbar-track {
  background: #1e1e1e;
}

.command-palette-content::-webkit-scrollbar-thumb {
  background: #424242;
  border-radius: 5px;
}

.command-palette-content::-webkit-scrollbar-thumb:hover {
  background: #4e4e4e;
}
</style>
