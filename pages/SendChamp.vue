<template>
    <div>
        <h1>This is the heading of testing the champsms service</h1>
        <button @click="notify">Send SMS Notification</button>
    </div>
</template>

<script setup>
    import { useSmsStore } from '@/stores/sendsms'
    const smsStore = useSmsStore()

    const notify = async () => {
        console.log('clicked')
        try {
            await smsStore.sendSms('2349020563110', 'Welcome to KKK Toluwalase Cooperative Multi-Purpose Society!')
        } catch (e) {
            alert('SMS failed: ' + e.message)
            console.log(e.message)
        }
    }
</script>