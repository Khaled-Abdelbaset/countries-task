<template>
  <router-link
    :to="`/country/${country.name.common}`"
    class="rounded-lg overflow-hidden shadow-md bg-white dark:bg-blue-900 transition-all hover:shadow-xl hover:-translate-y-2 block"
  >
    <div class="h-40 overflow-hidden">
      <img
        :src="country.flags.png"
        :alt="country.flags.alt || `Flag of ${country.name.common}`"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="p-6">
      <h2 class="text-xl font-extrabold mb-4">{{ country.name.common }}</h2>

      <div class="space-y-1 text-sm">
        <p>
          <span class="font-semibold">Population:</span> {{ formatPopulation(country.population) }}
        </p>
        <p><span class="font-semibold">Region:</span> {{ country.region }}</p>
        <p>
          <span class="font-semibold">Capital:</span> {{ country.capital?.join(', ') || 'N/A' }}
        </p>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import type { Country } from '@/stores/countriesStore'
import { useCountriesStore } from '@/stores/countriesStore'

defineProps<{
  country: Country
}>()

const { formatPopulation } = useCountriesStore()
</script>

<style scoped></style>
