<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const boxes = ref([])

onMounted(() => {
  boxes.value.forEach(box => {
    gsap.from(box, {
      scrollTrigger: {
        trigger: box,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      yoyo: true,
    })
  })
})
</script>

<template>
  <section class="py-32 bg-gray-100">
    <div class="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
      <div v-for="i in 6" :key="i" ref="boxes" class="bg-white p-8 rounded-lg shadow-lg">
        <h3 class="text-xl font-bold mb-2">Card {{ i }}</h3>
        <p class="text-gray-600">This content reveals when you scroll into view.</p>
      </div>
    </div>
  </section>
</template>
