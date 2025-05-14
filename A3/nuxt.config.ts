// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
      strapiToken: process.env.STRAPI_API_TOKEN,
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
})
