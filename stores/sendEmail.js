import { defineStore } from 'pinia';
import { useFetch } from '#app';

export const useEmailStore = defineStore('email', () => {
  const sendEmail = async ({ to, from, subject, text }) => {
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
    sendEmail,
  };
});