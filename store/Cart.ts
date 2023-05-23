import { Beat } from '@/utils/types/Beats'

export const useCart = defineStore("cart", () => {
    //state
    const cart = ref<Beat[]>([])
    
    //actions
    return { 
        cart
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCart, import.meta.hot));
}