import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useColorThemeStore = defineStore('colorTheme', () => {
  const storedTheme = localStorage.getItem('theme');
  const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const isDarkMode = ref(
    storedTheme
      ? storedTheme === 'dark'
      : systemDarkMode
  );

  // Method to toggle theme
  function toggleTheme() {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
  }

  // Apply theme class to document when theme changes
  watch(isDarkMode, (newValue) => {
    if (newValue) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, { immediate: true });

  return {
    isDarkMode,
    toggleTheme
  };
});
