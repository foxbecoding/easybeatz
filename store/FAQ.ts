import { FAQ } from '@/utils/types/FAQ'

export const useFAQS = defineStore("faqs", () => {
    //state
    const faqs = ref<FAQ[]>([])
    
    //actions
    const init = async (): Promise<void>  => {
        const res = await fetch(`${process.env.API_BASE_URL}${process.env.API_FAQS}`)
        const data = await res.json() as PricePackage[]
        faqs.value = data
    }

    return { 
        faqs,
        init
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useFAQS, import.meta.hot));
}