// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', '@pinia/nuxt'],

  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    // and more...
  },

  app: {
    head: {
      title: "Horse Racing Game",
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        }
      ],
      link: [
        {
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap'
        },
        {
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@100..900&display=swap'
        }
      ]
    }
  },
  typescript: {
    typeCheck: true,
    strict: true // Enable strict type checking
  },
  pinia: {
    storesDirs: ['stores/**', 'stores'],
  },

})