<script setup lang="ts">
import { useColorThemeStore } from '../stores/colorThemeStore'

const themeStore = useColorThemeStore()
</script>

<template>
  <header class="bg-white dark:bg-blue-900 shadow-sm px-4 py-6">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
            Dark Mode
          </span>
          <span v-else class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Light Mode
          </span>
        </button>
      </nav>
    </div>
  </header>
</template>
