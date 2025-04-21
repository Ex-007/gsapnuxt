<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const box = ref(null)

onMounted(() => {
  gsap.from(box.value, {
    x: -200,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
  })
})
</script>

<template>
  <div class="p-10">
    <div ref="box" class="w-32 h-32 bg-green-500">Animate me</div>
  </div>
</template>
