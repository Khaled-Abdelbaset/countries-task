<template>
  <div class="loading fixed flex justify-center items-center w-full h-full">
    <span class="circle"></span>
  </div>
</template>
<script lang="ts" setup></script>

<style scoped>
.loading {
  inset: 0;
  background-color: #313131b4;
}
.loading .circle {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 15px solid #fff;
  border-top-color: transparent !important;
  animation: spin infinite linear 0.8s;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
