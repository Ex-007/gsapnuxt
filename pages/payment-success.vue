<!-- pages/payment-success.vue -->
<script setup>
import { useRoute, useRouter } from 'vue-router'
import { usePaymentStore } from '@/stores/makePayment'

const store = usePaymentStore()
const route = useRoute()
const router = useRouter()
const verificationComplete = ref(false)

const payRef = route.query.paymentReference || paymentRef.value

watch(() => store.canNavigate, (newVal) => {
  if(newVal){
    router.push(`/form/${payRef}`)
  }
})


onMounted(async() => {
  await store.handleMonnifyCallback()
  verificationComplete.value = true;
})
</script>

<template>
  <div>
    <div v-if="!verificationComplete">
      <h2>Verifying your payment... 🔁</h2>
      <p>Please wait while we confirm your transaction.</p>
    </div>
    
    <div v-else>
      <div v-if="store.paymentStatus === 'PAID'" class="success-message">
        <h2>Payment Successful! ✅</h2>
        <p>Thank you for your payment. Your transaction has been completed successfully.</p>
      </div>
      
      <div v-else class="error-message">
        <h2 class="text-2xl font-bold text-red-600 mb-4">Payment Verification Failed ❌</h2>
        <p>We couldn't verify your payment. Please contact support if funds were deducted.</p>
        <p v-if="store.error" class="error-details mt-2 text-red-500">{{ store.error }}</p>
      </div>
    </div>
  </div>
</template>
