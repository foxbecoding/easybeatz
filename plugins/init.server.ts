import { useRootStore } from '~/store'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('app:rendered', async () => {
        const store = useRootStore(nuxtApp.$pinia)
        await store.initServer()
    })  
})