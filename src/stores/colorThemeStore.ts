import { defineStore } from 'pinia';
import { ref } from 'vue';

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

    // Store the theme preference in localStorage
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');

    // Update the document class based on the theme
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark');
    }
    else {
      document.documentElement.classList.remove('dark');
    }
  }

  return {
    isDarkMode,
    toggleTheme
  };
});
