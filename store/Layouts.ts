export const useLayoutsStore = defineStore("layouts-store", () => {
    //state
    const isRail = ref<boolean>(false)
    const isMobileMenu = ref<boolean>(false)
    const mobileAdjust = ref<number>(75)

    return {
        isRail,
        isMobileMenu,
        mobileAdjust
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useLayoutsStore, import.meta.hot));
}