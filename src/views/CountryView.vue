<template>
  <main class="container">
    <!-- Back button -->
    <button
      @click="$router.back()"
      class="flex items-center gap-2 px-6 py-2 mb-12 bg-white dark:bg-blue-900 rounded-md shadow-md hover:shadow-lg transition-all cursor-pointer"
      aria-label="Go back"
    >
      <span class="material-icons">arrow_back</span>
      Back
    </button>

    <!-- Loading state -->
    <PageLoader v-if="isLoading" />

    <!-- Error state -->
    <div v-else-if="error" class="text-center py-10">
      <p class="text-red-500">{{ error }}</p>
    </div>

    <!-- Country Data -->
    <div v-else-if="country" class="grid md:grid-cols-2 gap-12">
      <!-- Flag -->
      <div>
        <img
          :src="country.flags.svg || country.flags.png"
          :alt="country.flags.alt || `Flag of ${country.name.common}`"
          class="w-full h-auto shadow-md"
        />
      </div>

      <!-- Details  -->
      <div class="flex flex-col justify-center space-y-8">
        <h1 class="text-2xl md:text-3xl font-extrabold">{{ country.name.common }}</h1>

        <div class="grid md:grid-cols-2 gap-8">
          <div class="space-y-2">
            <p><span class="font-semibold">Native Name:</span> {{ getNativeName(country) }}</p>
            <p>
              <span class="font-semibold">Population:</span>
              {{ countriesStore.formatPopulation(country.population) }}
            </p>
            <p><span class="font-semibold">Region:</span> {{ country.region }}</p>
            <p><span class="font-semibold">Sub Region:</span> {{ country.subregion || 'N/A' }}</p>
            <p>
              <span class="font-semibold">Capital:</span> {{ country.capital?.join(', ') || 'N/A' }}
            </p>
          </div>

          <div class="space-y-2">
            <p>
              <span class="font-semibold">Top Level Domain:</span>
              {{ country.tld?.join(', ') || 'N/A' }}
            </p>
            <p><span class="font-semibold">Currencies:</span> {{ getCurrencies(country) }}</p>
            <p><span class="font-semibold">Languages:</span> {{ getLanguages(country) }}</p>
          </div>
        </div>

        <!-- Border countries -->
        <div class="flex flex-wrap gap-2 items-center">
          <h3 class="font-semibold mr-2">Border Countries:</h3>
          <div v-if="getBorderCountries(country).length === 0" class="text-grey-400">None</div>
          <router-link
            v-for="borderCountry in getBorderCountries(country)"
            :key="borderCountry"
            :to="`/country/${borderCountry}`"
            class="px-4 py-1 bg-white dark:bg-blue-900 rounded shadow-sm text-sm hover:shadow-md transition-all"
          >
            {{ borderCountry }}
          </router-link>
        </div>
      </div>
    </div>

    <!-- No country found -->
    <div v-else class="text-center py-10">
      <p>Country not found</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Country } from '@/stores/countriesStore'
import { useCountriesStore } from '@/stores/countriesStore'
import PageLoader from '@/components/ui/PageLoader.vue'

const route = useRoute()
const countryName = route.params.name as string
const countriesStore = useCountriesStore()
const country = ref<Country | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

// Get currencies
const getCurrencies = (country: Country): string => {
  if (!country.currencies) return 'None'
  return Object.values(country.currencies)
    .map((currency) => currency.name)
    .join(', ')
}

// Get languages
const getLanguages = (country: Country): string => {
  if (!country.languages) return 'None'
  return Object.values(country.languages).join(', ')
}

// Get first available native name
const getNativeName = (country: Country): string => {
  if (!country.name.nativeName) return country.name.common
  const firstLang = Object.keys(country.name.nativeName)[0]
  return firstLang ? country.name.nativeName[firstLang].common : country.name.common
}

// Get border countries
const getBorderCountries = (country: Country) => {
  if (!country.borders || !country.borders.length) return []

  // Find countries that match border codes
  return country.borders.map((borderCode) => {
    const borderCountry = countriesStore.countries.find(
      (c) => c.name.common.substring(0, 3).toUpperCase() === borderCode,
    )
    return borderCountry?.name.common || borderCode
  })
}

// Get country by name
const getCountryByName = (name: string) => {
  isLoading.value = true
  error.value = null
  try {
    const foundCountry = countriesStore.countries.find(
      (c) => c.name.common.toLowerCase() === name.toLowerCase(),
    )

    if (foundCountry) {
      country.value = foundCountry
    } else {
      error.value = `Country "${name}" not found`
    }
  } catch (e) {
    error.value = 'An error occurred'
    console.error('Error finding country:', e)
  } finally {
    isLoading.value = false
  }
}

// Watch for route changes to update the country
watch(
  () => route.params.name,
  (newName) => {
    if (newName && typeof newName === 'string') {
      getCountryByName(newName)
    }
  },
  { immediate: false },
)

onMounted(async () => {
  // Fetch all countries if not already loaded
  if (!countriesStore.countries.length) {
    isLoading.value = true
    await countriesStore.fetchCountries()
  }

  // Find the country name
  getCountryByName(countryName)
})
</script>
