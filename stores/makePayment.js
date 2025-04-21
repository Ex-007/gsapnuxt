import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';

export const usePaymentStore = defineStore('payment', () => {
  const isLoading = ref(false)
  const error = ref(null)
  const amount = ref(5000)
  const paymentStatus = ref('')
  const paymentCompleted = ref(false)
  const canNavigate = ref(false)
  

    // INITIALIZE THE PAYMENT
    const makePayment = async (payRef, paymentDetails) => {
        console.log(payRef)
        console.log(paymentDetails)
        isLoading.value = true
        error.value = null
        try {
            const paymentDescription = 'Membership Registration Form'
            const response = await $fetch('/api/payments/makePayment', {
                method: 'POST',
                body: {
                    name: paymentDetails.surname + ' ' + (paymentDetails.firstName || ''),
                    email: paymentDetails.customerEmail,
                    amount: amount.value,
                    transactionRef: payRef,
                    phoneNumber: paymentDetails.phone,
                    paymentDescription

                }
            })

            console.log(response)

            if (!response.success && response.message) {
                throw new Error(response.message);
              }

            const checkoutUrl = response.responseBody.checkoutUrl
            const payRefj = response.responseBody.paymentReference
            console.log(checkoutUrl)

            if(checkoutUrl){
                localStorage.setItem('redirectu', checkoutUrl)
                localStorage.setItem('payref', payRefj)
                window.location.href = checkoutUrl
            }else {
                throw new Error('No checkout URL returned from payment provider');
            }
        } catch (err) {
            error.value = err.message
            console.log(err.message)
            isLoading.value = false
        } finally{
            isLoading.value = false
        }
    }

    // VERIFY THE PAYMENT
const handleMonnifyCallback = async () => {
    const route = useRoute()
    isLoading.value = true
    error.value = null
    

    const payRef = route.query.paymentReference || paymentRef.value
    // console.log(payRef)
    if (!payRef) return

    try {
      const result = await $fetch(`/api/payments/confirmPayment?reference=${payRef}`)

      // console.log(result)
      if (result.responseBody.paymentStatus === 'PAID') {
        paymentStatus.value = 'PAID';
        // console.log('✅ Payment Verified')
        paymentCompleted.value = true;
        // console.log(result.responseBody)
        await saveToDatabase(result.responseBody)
        canNavigate.value = true
      } else {
        // console.warn('❌ Payment not successful or incomplete')
        // console.log(result.responseBody.paymentStatus || 'FAILED')
        paymentStatus.value = result.responseBody.paymentStatus || 'FAILED';
      }
    } catch (e) {
      // console.error('Verification Failed:', e)
    } finally {
        isLoading.value = false
    }
  }

  // SAVE DETAILS TO FIREBASE
  const saveToDatabase = async (response) => {
    isLoading.value = true
    error.value = null
    const {$supabase} = useNuxtApp()

    const transID = response.paymentReference
    const email = response.customer.email
    try {
      const {data, error} = await $supabase
      .from('TRANSACTIONID')
      .insert({
        transaction_id : transID,
        email: email
      })
      .select()

      if(error) throw error
    } catch (err) {
      error.value = err.message
      //  console.log(err.message)
    }
  }





  return {
    isLoading,
    error,
    makePayment,
    handleMonnifyCallback,
    paymentStatus,
    paymentCompleted,
    canNavigate
  };
});