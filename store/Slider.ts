export const useSliderStore = defineStore("slider-store", () => {
    const scrollLeft = reactive({
        playlists: 0
    })
  

    return { 
        scrollLeft
    }
})


if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSliderStore, import.meta.hot));
}