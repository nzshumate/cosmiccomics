export default defineNuxtConfig({
  compatibilityDate: '2026-09-06',
  devtools: { enabled: false },
  css: ['~/assets/scss/main.scss'],
  app: {
    head: {
      title: 'CosmicComics — Find your next universe',
      htmlAttrs: { lang: 'en' },
      meta: [
        {
          name: 'description',
          content:
            'Discover extraordinary comics at CosmicComics. Explore real titles, iconic characters, and independent stories in our curated demo shop.',
        },
        { name: 'theme-color', content: '#151619' },
      ],
      link: [{ rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    },
  },
  typescript: { strict: true },
  routeRules: { '/shop': { prerender: false } },
})
