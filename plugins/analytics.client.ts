import { createGtm } from '@gtm-support/vue-gtm'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(createGtm({
    id: 'GTM-K7WGJQ6',
    defer: false,
    compatibility: false,
    enabled: true,
    debug: false,
    loadScript: true,
    vueRouter: useRouter(),
    trackOnNextTick: false,
  }))
})