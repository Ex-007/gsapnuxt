<script setup>
import { ref } from 'vue'
import gsap from 'gsap'

const isOpen = ref(false)
const menu = ref(null)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    gsap.fromTo(menu.value,
      { clipPath: 'circle(0% at 100% 0%)' },
      { clipPath: 'circle(150% at 50% 50%)', duration: 0.8, ease: 'power2.out' }
    )
  } else {
    gsap.to(menu.value, {
      clipPath: 'circle(0% at 100% 0%)',
      duration: 0.5,
      ease: 'power2.in'
    })
  }
}
</script>

<template>
  <div class="relative h-screen bg-gray-800 text-white overflow-hidden">
    <button @click="toggleMenu" class="p-4 bg-green-600 m-4 rounded z-50 relative">Toggle Menu</button>
    
    <div
      ref="menu"
      class="absolute inset-0 bg-black flex flex-col items-center justify-center text-4xl space-y-8"
      style="clip-path: circle(0% at 100% 0%); transition: clip-path 0.3s;"
    >
      <a href="#">Home</a>
      <a href="#">Services</a>
      <a href="#">Contact</a>
    </div>
  </div>
</template>
