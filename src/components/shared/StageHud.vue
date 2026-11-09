<template>
  <!-- The question, the score and the main buttons of a fretboard exercise, shown right
       above the fretboard (the #stage-hud slot of App.vue), so that what is asked and where
       to answer are always on screen together. -->
  <Teleport defer to="#stage-hud" :disabled="!onStage">
    <div class="stage-hud" :class="{ 'stage-hud--inline': !onStage }" role="region" :aria-label="label">
      <div v-if="$slots.score" class="stage-hud-score"><slot name="score" /></div>
      <div class="stage-hud-main" aria-live="polite"><slot /></div>
      <div v-if="$slots.actions" class="stage-hud-actions"><slot name="actions" /></div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

defineProps({
  label: { type: String, default: '' },
})

const route = useRoute()
// App.vue renders the stage slot on the fretboard exercises only.
const onStage = computed(() => !!route.meta?.game && route.meta?.fretboard !== false)
</script>
