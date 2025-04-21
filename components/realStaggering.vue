<!-- components/StaggerAnimation.vue -->
<template>
    <div class="animation-container">
      <div class="animation-elements">
        <!-- These are the elements that will be animated -->
        <div v-for="i in 20" :key="i" class="stagger-element"></div>
      </div>
      
      <!-- Content container that sits on top of the animation -->
      <div class="content-container">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, onBeforeUnmount } from 'vue';
  import gsap from 'gsap';
  
  // Animation configuration
  const props = defineProps({
    duration: {
      type: Number,
      default: 2
    },
    stagger: {
      type: Number,
      default: 0.05
    },
    repeat: {
      type: Number,
      default: -1
    },
    yoyo: {
      type: Boolean,
      default: true
    }
  });
  
  let timeline;
  
  onMounted(() => {

      // Create timeline for the animation
      timeline = gsap.timeline({
        repeat: props.repeat,
        yoyo: props.yoyo
      });
  
      // Select all stagger elements
      const elements = document.querySelectorAll('.stagger-element');
      
      // Add staggered animation to timeline
      timeline.from(elements, {
        x: 100,
        opacity: 0,
        scale: 0,
        duration: props.duration,
        stagger: props.stagger,
        ease: "power3.out"
        // ease: "back.out(1.7)"
      });
  });
  
  onBeforeUnmount(() => {
    if (timeline) {
      timeline.kill();
    }
  });
  </script>
  
  <style scoped>
  .animation-container {
    position: relative;
    width: 100%;
    min-height: 300px;
    overflow: hidden;
  }
  
  .animation-elements {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }
  
  .stagger-element {
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgb(83, 83, 147);
    box-shadow: 0 0 10px rgba(100, 100, 255, 0.3);
    left: calc(var(--random-x, 50) * 1%);
    top: calc(var(--random-y, 50) * 1%);
  }
  
  .content-container {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
  }
  
  /* Apply random positions to stagger elements */
  .stagger-element:nth-child(1) { --random-x: 10; --random-y: 15; }
  .stagger-element:nth-child(2) { --random-x: 20; --random-y: 65; }
  .stagger-element:nth-child(3) { --random-x: 30; --random-y: 35; }
  .stagger-element:nth-child(4) { --random-x: 40; --random-y: 85; }
  .stagger-element:nth-child(5) { --random-x: 50; --random-y: 25; }
  .stagger-element:nth-child(6) { --random-x: 60; --random-y: 75; }
  .stagger-element:nth-child(7) { --random-x: 70; --random-y: 45; }
  .stagger-element:nth-child(8) { --random-x: 80; --random-y: 15; }
  .stagger-element:nth-child(9) { --random-x: 90; --random-y: 55; }
  .stagger-element:nth-child(10) { --random-x: 15; --random-y: 85; }
  .stagger-element:nth-child(11) { --random-x: 25; --random-y: 35; }
  .stagger-element:nth-child(12) { --random-x: 35; --random-y: 65; }
  .stagger-element:nth-child(13) { --random-x: 45; --random-y: 15; }
  .stagger-element:nth-child(14) { --random-x: 55; --random-y: 75; }
  .stagger-element:nth-child(15) { --random-x: 65; --random-y: 25; }
  .stagger-element:nth-child(16) { --random-x: 75; --random-y: 65; }
  .stagger-element:nth-child(17) { --random-x: 85; --random-y: 35; }
  .stagger-element:nth-child(18) { --random-x: 5; --random-y: 45; }
  .stagger-element:nth-child(19) { --random-x: 15; --random-y: 75; }
  .stagger-element:nth-child(20) { --random-x: 95; --random-y: 25; }
  </style>