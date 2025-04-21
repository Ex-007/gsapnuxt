<template>
  <div>
      <button @click="send" :disabled="sending">
          {{ sending ? 'Sending...' : 'Send Email' }}
      </button>
      <p v-if="status" :class="{ 'text-red': status.error, 'text-green': !status.error }">
          {{ status.message }}
      </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useEmailStore } from '@/stores/sendEmail';

const emailStore = useEmailStore();
const sending = ref(false);
const status = ref(null);

const send = async () => {
sending.value = true;
status.value = null;

try {
  const result = await emailStore.sendEmail({
    to: 'agbebibidemi02@gmail.com',
    from: 'KKK-Toluwalase@kkktoluwalase.org',
    subject: 'Now Working',
    text: 'Hey! This is a plain text email from my Nuxt3 + Resend integration.'
  });

  console.log('Send result:', result);
  
  if (result.error) {
    status.value = { error: true, message: `Error: ${result.error}` };
  } else {
    status.value = { error: false, message: 'Email sent successfully!' };
  }
} catch (err) {
  status.value = { error: true, message: `Error: ${err.message}` };
} finally {
  sending.value = false;
}
};
</script>

<style scoped>
.text-red {
color: red;
}
.text-green {
color: green;
}
</style>