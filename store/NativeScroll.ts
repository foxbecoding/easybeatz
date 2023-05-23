export const useNativeScroll = defineStore("native-scroll", () => {
    const scrollTop = reactive({
        beats: 0,
        playing: 0
    })
    
    return { 
        scrollTop
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useNativeScroll, import.meta.hot));
}