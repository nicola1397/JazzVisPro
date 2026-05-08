<template>
  <div class="countdown-overlay" v-if="show">{{ value }}</div>
</template>

<script setup>
defineProps({ show: Boolean, value: Number })
</script>
