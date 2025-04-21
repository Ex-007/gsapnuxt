// stores/sendsms.js
import { defineStore } from 'pinia'
import { ref } from 'vue' // Added missing import

export const useSmsStore = defineStore('sms', () => {
  const isLoading = ref(false)
  const error = ref(null)

  const sendSms = async (to, message, senderName = 'Sendchamp', route = 'non_dnd') => {
    isLoading.value = true
    error.value = null
    console.log(to, message, senderName, route)
    try {
      const response = await $fetch('/api/send-sms', {
        method: 'POST',
        body: {
          to,
          message,
          sender: senderName,
          route,
        },
      })

      if (!response.success) {
        error.value = response.error
        throw new Error(response.error)
      }

      console.log('SMS Response:', response.data)
      return response.data
    } catch (err) {
      console.error('SMS Error:', err.message)
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    sendSms,
  }
})