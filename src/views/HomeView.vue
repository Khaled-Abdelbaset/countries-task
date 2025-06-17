<script setup lang="ts">
import AllCountries from '@/components/countries/AllCountries.vue';
import CountryFilters from '@/components/countries/CountryFilters.vue'

</script>

<template>
  <main class="container">
    <CountryFilters />
    <AllCountries />
  </main>
</template>
