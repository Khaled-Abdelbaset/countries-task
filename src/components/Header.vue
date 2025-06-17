<script setup lang="ts">
import { useColorThemeStore } from '../stores/colorThemeStore'

const themeStore = useColorThemeStore()
</script>

<template>
  <header class="bg-white dark:bg-blue-900 shadow-sm px-4 py-6 mb-10">
    <div class="container flex justify-between items-center gap-4">
      <h1 class="font-extrabold text-grey-950 dark:text-white text-lg md:text-xl">
        Where in the world?
      </h1>
      <nav>
        <button
          @click="themeStore.toggleTheme"
          class="flex items-center gap-2 text-grey-950 dark:text-white font-semibold transition-colors cursor-pointer"
          aria-label="Toggle dark mode"
        >
          <span v-if="themeStore.isDarkMode" class="flex items-center gap-2">
            <span class="material-icons">dark_mode</span>
            Dark Mode
          </span>
          <span v-else class="flex items-center gap-2">
            <span class="material-icons">light_mode</span>
            Light Mode
          </span>
        </button>
      </nav>
    </div>
  </header>
</template>
