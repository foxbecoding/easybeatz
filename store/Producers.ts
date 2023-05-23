import { Producer } from '@/utils/types/Producer'

export const useProducers = defineStore("producers", () => {
    //state
    const producers = ref<Producer[]>([])
    
    //actions
    const init = async (): Promise<void>  => {
        const res = await fetch(`${process.env.API_BASE_URL}${process.env.API_PRODUCERS}`)
        const data = await res.json() as Producer[]
        producers.value = data
    }

    return { 
        producers,
        init
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useProducers, import.meta.hot));
}