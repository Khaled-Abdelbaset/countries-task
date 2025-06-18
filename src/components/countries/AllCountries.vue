<script lang="ts" setup>
import { onMounted, watch } from 'vue'
import { useCountriesStore } from '@/stores/countriesStore'
import CountryCard from '@/components/countries/CountryCard.vue'
import PageLoader from '@/components/ui/PageLoader.vue'
import LoadMoreButton from '@/components/ui/LoadMoreButton.vue'

const countriesStore = useCountriesStore()

onMounted(() => {
  countriesStore.fetchCountries()
})

// Reset pagination when filters change
watch(
  [() => countriesStore.searchQuery, () => countriesStore.selectedRegion],
  () => {
    countriesStore.resetDisplayCount()
  }
)
</script>

<template>
  <section>
    <!-- Loading spinner for initial load -->
    <PageLoader v-if="countriesStore.isLoading" />

    <div v-else-if="countriesStore.error" class="text-center py-8">
      <p class="text-red-500">{{ countriesStore.error }}</p>
    </div>

    <div v-else>
      <div v-if="!countriesStore.filteredCountries.length" class="text-center py-8">
        <p class="text-gray-500 dark:text-gray-300">No countries found matching your filtration</p>
      </div>

      <section v-else class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        <CountryCard
          v-for="country in countriesStore.displayedCountries"
          :key="country.name.common"
          :country="country"
        />
      </section>

      <!-- Load more button -->
      <LoadMoreButton
        v-if="countriesStore.hasMore"
        :loading="countriesStore.isLoadingMore"
        @load-more="countriesStore.loadMore"
      />

      <!-- Displayed countries count -->
      <div class="text-center mt-6 text-sm text-grey-400">
        {{ countriesStore.displayedCountries.length }} of
        {{ countriesStore.filteredCountries.length }} countries
        <span v-if="countriesStore.filteredCountries.length !== countriesStore.totalCountries">
          (filtered from {{ countriesStore.totalCountries }})
        </span>
      </div>
    </div>
  </section>
</template>
