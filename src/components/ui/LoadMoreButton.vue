<template>
  <div class="flex justify-center mt-10">
    <button
      @click="$emit('load-more')"
      :disabled="loading"
      class="px-6 py-3 bg-white dark:bg-blue-900 rounded-md shadow-sm hover:shadow-md transition-all flex items-center gap-3 disabled:opacity-70 cursor-pointer"
    >
      <template v-if="!loading">
        <span>{{ label || 'Load More' }}</span>
      </template>
      <template v-else>
        <span class="material-icons animate-spin text-blue-500 dark:text-white">autorenew</span>
        <span>{{ loadingLabel || 'Loading...' }}</span>
      </template>
    </button>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  loading: boolean
  label?: string
  loadingLabel?: string
}>()

defineEmits<{
  (e: 'load-more'): void
}>()
</script>
