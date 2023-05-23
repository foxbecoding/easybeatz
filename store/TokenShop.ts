export const useTokenShop = defineStore("token-shop", () => {
    //state
    const quantity = ref<number>(1)
    const price = ref<number>(9.99)
    const client_secret = ref<string>()

    const SUBTOTAL = computed(() => {
        let total = price.value * quantity.value
        return total.toFixed(2)
    })

    
    const increase = (): void => {
        quantity.value++
    }
    
    const decrease = (): void => {
        if(quantity.value === 1){ return; }
        quantity.value--
    }   

    return {
        quantity,
        price,
        client_secret,
        SUBTOTAL,
        increase,
        decrease,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTokenShop, import.meta.hot));
}