import { PricePackage } from '@/utils/types/PricePackage'

export const usePricePackages = defineStore("price-packages", () => {
    //state
    const price_packages = ref<PricePackage[]>([])
    
    //actions
    const init = async (): Promise<void>  => {
        const res = await fetch(`${process.env.API_BASE_URL}${process.env.API_PRICE_PACKAGES}`)
        const data = await res.json() as PricePackage[]
        price_packages.value = data
    }

    return { 
        price_packages,
        init
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePricePackages, import.meta.hot));
}