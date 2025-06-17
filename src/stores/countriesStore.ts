import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface Country {
  flags: {
    png: string
    svg: string
    alt: string
  }
  name: {
    common: string
    official: string
    nativeName: Record<string, {
      official: string
      common: string
    }>
  }
  tld: string[]
  currencies: Record<string, {
    name: string
    symbol: string
  }>
  capital: string[]
  region: string
  subregion: string
  languages: Record<string, string>
  borders: string[]
  population: number
}

export const useCountriesStore = defineStore('countriesStore', () => {
  const countries = ref<Country[]>([])
  const isLoading = ref(true)
  const isLoadingMore = ref(false)
  const error = ref<string | null>(null)
  const displayCount = ref(12)
  const searchQuery = ref('')
  const selectedRegion = ref('All')
  const totalCountries = computed(() => countries.value.length)

  // Filter countries based on search query and selected region
  const filteredCountries = computed(() => {
    let result = [...countries.value]

    // Filter by region if not "All"
    if (selectedRegion.value !== 'All') {
      result = result.filter(country => country.region === selectedRegion.value)
    }

    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase().trim()
      result = result.filter(country =>
        country.name.common.toLowerCase().includes(query) ||
        country.name.official.toLowerCase().includes(query)
      )
    }

    return result
  })

  const displayedCountries = computed(() => {
    return filteredCountries.value.slice(0, displayCount.value)
  })

  const hasMore = computed(() => {
    return displayCount.value < filteredCountries.value.length
  })

  // Reset display count when filters change
  const resetDisplayCount = () => {
    displayCount.value = 12
  }

  const fetchCountries = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(
        'https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,subregion,languages,tld,currencies,borders'
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch countries: ${response.status}`)
      }

      const allCountries = await response.json()
      countries.value = allCountries.filter((country: Country) => country.name.common !== 'Israel')
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An unknown error occurred'
      console.error('Error fetching countries:', e)
    } finally {
      isLoading.value = false
    }
  }

  const loadMore = async () => {
    isLoadingMore.value = true
    try {
      // Delay simulating a network request
      await new Promise(resolve => setTimeout(resolve, 500))
      displayCount.value += 12
    } finally {
      isLoadingMore.value = false
    }
  }

  // Format number
  const formatPopulation = (population: number): string => {
    return population.toLocaleString()
  }

  return {
    countries,
    displayedCountries,
    filteredCountries,
    isLoading,
    isLoadingMore,
    error,
    searchQuery,
    selectedRegion,
    fetchCountries,
    formatPopulation,
    loadMore,
    hasMore,
    totalCountries,
    resetDisplayCount
  }
})
