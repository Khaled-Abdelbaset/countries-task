<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCountriesStore } from '@/stores/countriesStore'

const countriesStore = useCountriesStore()
const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
const isDropdownOpen = ref(false)
const selectedOptionId = 'selected-region'

const selectRegion = (region: string) => {
  countriesStore.selectedRegion = region
  isDropdownOpen.value = false
}

// Close dropdown when clicking outside
const closeDropdown = (event: Event) => {
  const el = event.target as HTMLInputElement
  if (!el.closest('.region-dropdown')) {
    isDropdownOpen.value = false
  }
}

// Add event listener for document clicks when component is mounted for closing the dropdown
onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

// Clean up event listeners when component is unmounted
onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<template>
  <div class="mb-8 flex flex-col md:flex-row gap-6 md:justify-between">
    <!-- Search Input To Search With Country Name -->
    <div class="relative w-full lg:w-1/3 md:w-1/2">
      <label for="country-search" class="sr-only">Search for a country</label>
      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <span class="material-icons text-grey-400 dark:text-white">search</span>
      </div>
      <input
        id="country-search"
        type="text"
        v-model="countriesStore.searchQuery"
        placeholder="Search for a country..."
        aria-label="Search for a country"
        class="pl-12 py-4 pr-4 rounded-lg shadow-md w-full bg-white dark:bg-blue-900 text-grey-950 dark:text-white focus:outline-none border-transparent focus:border-transparent focus:ring-2 focus:ring-gray-300 transition-colors"
      />
    </div>

    <!-- Custom Region Filter Dropdown -->
    <div class="relative w-full lg:w-1/4 md:w-1/3 region-dropdown">
      <div
        @click="isDropdownOpen = !isDropdownOpen"
        class="flex justify-between items-center py-4 px-6 rounded-lg shadow-md bg-white dark:bg-blue-900 text-grey-950 dark:text-white cursor-pointer transition-colors"
        :aria-expanded="isDropdownOpen"
        aria-haspopup="listbox"
        role="combobox"
        :aria-controls="selectedOptionId"
        aria-label="Filter by region"
        tabindex="0"
        @keydown.enter="isDropdownOpen = !isDropdownOpen"
        @keydown.space.prevent="isDropdownOpen = !isDropdownOpen"
        @keydown.escape="isDropdownOpen = false"
      >
        <span id="selectedOptionId">{{
          countriesStore.selectedRegion === 'All'
            ? 'Filter by Region'
            : countriesStore.selectedRegion
        }}</span>
        <span
          class="material-icons text-grey-400 dark:text-white transition-transform"
          :class="{ 'rotate-180': isDropdownOpen }"
        >
          expand_more
        </span>
      </div>

      <!-- Dropdown options -->
      <ul
        v-if="isDropdownOpen"
        class="absolute z-10 mt-1 w-full bg-white dark:bg-blue-900 shadow-lg rounded-lg overflow-hidden"
        role="listbox"
        aria-labelledby="selectedOptionId"
      >
        <li
          v-for="region in regions"
          :key="region"
          @click="selectRegion(region)"
          class="py-2 px-6 hover:bg-grey-50 dark:hover:bg-blue-950 cursor-pointer transition-colors"
          :class="{ 'font-bold': region === countriesStore.selectedRegion }"
          role="option"
          :aria-selected="region === countriesStore.selectedRegion"
          tabindex="0"
          @keydown.enter="selectRegion(region)"
          @keydown.space.prevent="selectRegion(region)"
        >
          {{ region === 'All' ? 'All Regions' : region }}
        </li>
      </ul>
    </div>
  </div>
</template>
