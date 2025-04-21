// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules:['@pinia/nuxt'],
  runtimeConfig: {
    sendchampKey: process.env.SENDCHAMP_KEY,
    resendKey: process.env.RESEND_KEY,
    MONNIFY_API_KEY: process.env.MONNIFY_API_KEY,
    MONNIFY_SECRET_KEY: process.env.MONNIFY_SECRET_KEY,
    MONNIFY_CONTRACT_CODE: process.env.MONNIFY_CONTRACT_CODE,
    MONNIFY_TEST_MODE: process.env.MONNIFY_TEST_MODE
  },
})
