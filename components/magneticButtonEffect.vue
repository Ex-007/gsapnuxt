<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'

const btn = ref(null)
let bounds = null

const handleMouseMove = (e) => {
  const x = e.clientX - bounds.left - bounds.width / 2
  const y = e.clientY - bounds.top - bounds.height / 2
  gsap.to(btn.value, { x, y, duration: 0.3, ease: 'power3.out' })
}

const resetPos = () => {
  gsap.to(btn.value, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
}

onMounted(() => {
  bounds = btn.value.getBoundingClientRect()
  btn.value.addEventListener('mousemove', handleMouseMove)
  btn.value.addEventListener('mouseleave', resetPos)
})

onBeforeUnmount(() => {
  btn.value.removeEventListener('mousemove', handleMouseMove)
  btn.value.removeEventListener('mouseleave', resetPos)
})
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-neutral-900">
    <button
      ref="btn"
      class="relative px-8 py-4 text-white bg-blue-600 rounded-full text-xl font-semibold shadow-lg"
    >
      Hover Me
    </button>
  </div>
</template>
