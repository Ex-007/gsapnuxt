<template>
    <div>
        <form @submit.prevent="makePayment">
            <label for="c-surname">Enter Surname</label>
            <input type="text" id="c-surname" placeholder="Enter Surname" required v-model="paymentDetails.surname">
            <label for="c-firstname">Enter Firstname</label>
            <input type="text" id="c-firstname" placeholder="Enter Firstname" required v-model="paymentDetails.firstname">
            <label for="c-phone">Enter Phone Number</label>
            <input type="text" id="c-phone" placeholder="Enter Phone Number" required v-model="paymentDetails.phone">
            <label for="c-email">Enter Email</label>
            <input type="email" id="c-email" placeholder="Enter Email" required v-model="paymentDetails.customerEmail">
            <p v-if="paymentDetails.error">{{ paymentDetails.message }}</p>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script setup>

import {usePaymentStore} from '~/stores/makePayment'
const paymentMaker = usePaymentStore()

    const paymentDetails = ref({
        surname: '',
        firstname : '',
        customerEmail: '',
        error: false,
        message: '',
        phone: ''
    })

    // GENERATE ID
    const generatedId = async () => {
      const length = 15
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters.charAt(randomIndex);
        }
        return 'KKK_' + result
    }

    // MAKE PAYMENT
    const makePayment = async () => {
        if(paymentDetails.value.customerEmail === '' || paymentDetails.value.customerName === ''){
            paymentDetails.value.error = true
            paymentDetails.value.message = 'No field must be empty'
            return
        }
        paymentDetails.value.error = false
        paymentDetails.value.error = ''
        const payRef = await generatedId()

        await paymentMaker.makePayment(payRef, paymentDetails.value)
    }
</script>

<style scoped>
    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }

    input{
        height: 30px;
        width: 200px;
        border-radius: 20px;
        border: 2px solid grey;
        padding: 5px;
    }

    button{
        height: 30px;
        width: 200px;
        border-radius: 20px;
        background-color: grey;
        color: white;
        border: 2px solid rgb(77, 59, 59);
        cursor: pointer;
    }
</style>