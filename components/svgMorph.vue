<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const shape = ref(null)

onMounted(() => {
  gsap.to(shape.value, {
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
    attr: {
      d: "M100,200 C100,100 300,100 300,200 S500,300 500,200"
    }
  })
})
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-black">
    <svg width="600" height="400" viewBox="0 0 600 400">
      <path
        ref="shape"
        d="M100,200 C200,100 400,100 500,200"
        fill="none"
        stroke="white"
        stroke-width="5"
      />
    </svg>
  </div>
</template>
