<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const heading = ref(null)
const subText = ref(null)
const cta = ref(null)

onMounted(() => {
  gsap.timeline()
    .from(heading.value, { y: -50, opacity: 0, duration: 2, ease: "power2.out", repeat: -1 })
    .from(subText.value, { y: 30, opacity: 0, duration: 2, repeat: -1  }, "-=0.4")
    .from(cta.value, { scale: 0.8, opacity: 0, duration: 2, repeat: -1  }, "-=0.4")
})
</script>

<template>
  <section class="h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex flex-col justify-center items-center text-white">
    <h1 ref="heading" class="text-5xl font-bold mb-4">Welcome to Smooth World</h1>
    <p ref="subText" class="text-xl mb-6">Nuxt 3 + GSAP = Magic</p>
    <button ref="cta" class="px-6 py-3 bg-white text-indigo-800 rounded-full font-semibold hover:scale-105 transition">Let’s Go</button>
  </section>
</template>
