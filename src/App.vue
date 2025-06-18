<template>
  <Header />
  <main>
    <div class="py-8">
      <router-view />
    </div>
  </main>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
</script>

<style></style>
