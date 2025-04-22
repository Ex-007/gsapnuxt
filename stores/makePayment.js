import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';

export const usePaymentStore = defineStore('payment', () => {
  const isLoading = ref(false)
  const error = ref(null)
  const amount = ref(5000)
  const paymentStatus = ref('')
  const paymentCompleted = ref(false)
  const canNavigate = ref(false)
  const alreadyMember = ref(false)
  const alreadyMemDet = ref(null)
  
  // CHECK IF THE USER IS ALREADY A MEMBER TO AVOID REGISTERING FOR THE SAME PERSON TWICE IN THE DATABASE
  const checkData = async(payRef, paymentDetails) => {
    isLoading.value = true
    error.value = null
    const {$supabase} = useNuxtApp()
    const email = paymentDetails.customerEmail
    try {
      const {data, error:checkError} = await $supabase
      .from('TRANSACTIONID')
      .select('*')
      .eq('email', email)
      .single()

      if(checkError){
        if (checkError.code === 'PGRST116') {
            error.value = 'Registration ID not found'
            await makePayment(payRef, paymentDetails)
            isLoading.value = false
            return
        }
        throw checkError
    }
    alreadyMember.value = true
    alreadyMemDet.value = data
    } catch (err) {
      error.value = err.message
    } finally{
      isLoading.value = false
    }
  }

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

  // SAVE DETAILS TO SUPABASE
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

      await telegramNoti(transID, email)
      await sendEmail(email, transID)
    } catch (err) {
      error.value = err.message
      //  console.log(err.message)
    }
  }

  // SEND TELEGRAM NOTIFICATION
  const telegramNoti = async (transID, email) => {
    isLoading.value = true
    error.value = null

    const message = `
      New Membership Form Purchased with the following Details.
      ID : ${transID}
      Price : NGN ${amount.value}
      Email : ${email}
    `
    try {
      const response = await $fetch('/api/telegramNotification', {
        method: 'POST',
        body:{
          message
        }
      })
      console.log(response.data)
    } catch (err) {
      error.value = err.message
      console.log(err.message)
    }
  }

  // SENDIGN EMAILS
  const sendEmail = async (email, transID) => {
    const to = email
    const from = 'KKK-Toluwalase@kkktoluwalase.org'
    const subject = 'KKK Cooperative Form Purchase'
    const text = `
      KKK Toluwalase Cooperative Multi-Purpose Society
      
      Dear ${to}, Congratulations on Joining the winning team, your form purchase was Successful.
      Your unique ID is -- ${transID}
      It is nice to have you onboard with us.

      If you have any further enquiry that is not on our website, please reach out on toluwalasecooperative2021@gmail.com or through the following numbers--
      09123456789 or 09087654321

      🎉🎉Welcome Once Again 🎉🎉
    `
      try {
        const { data, error } = await useFetch('/api/send-email', {
          method: 'POST',
          body: {
            to,
            from,
            subject,
            text
          }
        });
  
        if (error.value) {
          console.error('API error:', error.value);
          throw new Error(error.value.data?.error || 'Failed to send email');
        }
  
        if (data.value?.error) {
          console.error('Server reported error:', data.value.error);
          throw new Error(data.value.error);
        }
  
        console.log('Email sent successfully:', data.value);
        return data.value;
      } catch (err) {
        console.error('Email sending error:', err);
        return { error: err.message || 'Unknown error occurred' };
      }
    };





  return {
    isLoading,
    error,
    makePayment,
    handleMonnifyCallback,
    paymentStatus,
    paymentCompleted,
    canNavigate,
    telegramNoti,
    checkData,
    alreadyMember,
    alreadyMemDet
  };
});