<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const box = ref(null)

onMounted(() => {
  gsap.from(box.value, {
    scrollTrigger: {
      trigger: box.value,
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    y: 100,
    opacity: 0,
    duration: 1
  })
})
</script>

<template>
  <div class="h-[200vh] bg-gray-100 p-10">
    <div ref="box" class="w-32 h-32 bg-blue-500 mt-[150vh]">Scroll to Animate</div>
  </div>
</template>
