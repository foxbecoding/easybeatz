import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VVirtualScroll } from 'vuetify/labs/VVirtualScroll'

export default defineNuxtPlugin(nuxtApp => {
  const darkTheme = {
    dark: true,
    colors: {
      background: '#121212',
      surface: '#191919',
      primary: '#3fabf3',
      error: '#EF5350',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FB8C00',
    }
  } 
  const vuetify = createVuetify({
    ssr: true,
    components: { ...components, VVirtualScroll },
    directives,
    theme: {
      defaultTheme: 'darkTheme',
      themes: {
        darkTheme,
      }
    }
  })
  nuxtApp.vueApp.use(vuetify)
})