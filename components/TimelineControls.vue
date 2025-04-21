<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const box = ref(null)
let tl

onMounted(() => {
  tl = gsap.timeline({ paused: true })
  tl.to(box.value, { x: 300, duration: 1, ease: 'power1.inOut' })
    .to(box.value, { y: 100, duration: 1, ease: 'bounce.out' })
    .to(box.value, { rotate: 360, duration: 1 })
})
</script>

<template>
  <div class="p-10 space-y-6 bg-gray-900 min-h-screen text-white">
    <div ref="box" class="w-20 h-20 bg-pink-500 rounded-lg"></div>

    <div class="space-x-4">
      <button @click="tl.play()" class="px-4 py-2 bg-green-500 rounded">Play</button>
      <button @click="tl.pause()" class="px-4 py-2 bg-yellow-500 rounded">Pause</button>
      <button @click="tl.reverse()" class="px-4 py-2 bg-red-500 rounded">Reverse</button>
    </div>
  </div>
</template>
