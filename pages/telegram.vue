<template>
    <div>
        <button @click="sendT">Test</button>
    </div>
</template>


<script setup>
import {usePaymentStore} from '@/stores/makePayment'
const store = usePaymentStore()



const sendT = async() => {
    await store.telegramNoti()
}
</script>