export const useTokenData = defineStore("tokenData", () => {
    const isOpen = ref<boolean>(false)

    return { 
        isOpen
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTokenData, import.meta.hot));
}