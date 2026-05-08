<template>
  <div
    class="progression-step"
    :class="{ 'active-step': step.active, selected: step.selected }"
    draggable="true"
    @dragstart="onDragStart"
    @dragover.prevent="onDragOver"
    @drop="onDrop"
    @click="onClick"
  >
    <div class="row g-2 w-100 m-0 align-items-center">
      <div class="col-6 col-sm-auto order-1 d-flex align-items-center">
        <span class="step-label">{{ index + 1 }}</span>
      </div>
      <div class="col-6 col-sm-auto order-2 order-sm-3 d-flex justify-content-end">
        <button class="btn-remove-step" @click.stop="$emit('remove')"><span>×</span></button>
      </div>
      <div class="col-12 col-sm order-3 order-sm-2">
        <div class="row gx-2 gy-2 align-items-center">
          <div class="col-12 col-sm-2 col-lg-1">
            <div class="nav-group"><label>Key</label>
              <select :value="step.root" @change="$emit('update','root',$event.target.value)">
                <option v-for="n in NOTES" :key="n" :value="n">{{ n }}</option>
              </select>
            </div>
          </div>
          <div class="col-12 col-sm-10 col-lg-4">
            <div class="nav-group"><label>Scale</label>
              <select :value="step.scale" @change="$emit('update','scale',$event.target.value)">
                <option v-for="s in scaleKeys" :key="s" :value="s">{{ s }}</option>
              </select>
            </div>
          </div>
          <div class="col-12 col-sm-7 col-lg-4">
            <div class="row g-1 bg-black bg-opacity-25 p-1 rounded m-0 w-100">
              <div class="col-4">
                <div class="nav-group"><label>Bars</label>
                  <input type="text" :value="step.bars" @change="$emit('update','bars',+$event.target.value)">
                </div>
              </div>
              <div class="col-4">
                <div class="nav-group"><label>Beats</label>
                  <input type="number" :value="step.beats" @change="$emit('update','beats',+$event.target.value)">
                </div>
              </div>
              <div class="col-4">
                <div class="nav-group"><label>Den</label>
                  <select :value="step.denominator" @change="$emit('update','denominator',+$event.target.value)">
                    <option value="2">2</option><option value="4">4</option>
                    <option value="8">8</option><option value="16">16</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-5 col-lg-3">
            <div class="row g-1 m-0 w-100">
              <div class="col-8 p-0 pe-1">
                <div class="nav-group"><label>Chord</label>
                  <input type="text" :value="step.chordName" placeholder="Chord"
                    @change="$emit('update','chordName',$event.target.value)">
                </div>
              </div>
              <div class="col-4 p-0">
                <div class="nav-group"><label>Oct</label>
                  <input type="number" :value="step.chordOctave"
                    @change="$emit('update','chordOctave',+$event.target.value)">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { NOTES, SCALES } from '../../utils/theory.js'

const props = defineProps({ step: Object, index: Number, active: Boolean })
const emit  = defineEmits(['remove','update','select','reorder'])
const scaleKeys = computed(() => Object.keys(SCALES))

let dragSrcIdx = null
function onDragStart(e) {
  dragSrcIdx = props.index
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('text/plain', props.index)
}
function onDragOver(e) { e.dataTransfer.dropEffect = 'move' }
function onDrop(e) {
  e.preventDefault()
  const from = parseInt(e.dataTransfer.getData('text/plain'))
  if (from !== props.index) emit('reorder', from, props.index)
}
function onClick(e) {
  if (['INPUT','SELECT','BUTTON'].includes(e.target.tagName)) return
  emit('select', e.shiftKey, e.ctrlKey || e.metaKey)
}
</script>
