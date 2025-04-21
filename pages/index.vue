<template>
    <div>
        <button>
            <li><nuxt-link to="/SendChamp" class="routerMove">🔒SMS</nuxt-link></li>
            <li><nuxt-link to="/email" class="routerMove">Email</nuxt-link></li>
            <li><nuxt-link to="/Squad-payment" class="routerMove">Squad Payment</nuxt-link></li>
        </button>
        <h1>hello1</h1>
    </div>
  </template>

  <script setup>
import {useSupabaseTest} from '@/stores/supabasetest'
const store = useSupabaseTest()

onMounted(() => {
    console.log('started')
    store.fetchALL()
    console.log('stop')
})
</script>