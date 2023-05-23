import { useExploreBeats } from "@/store/Beats"

export const useInfiniteScroll =  (beats_length: number, start_k = 20) => {
    const exploreBeatsStore = useExploreBeats() 
    // const k = ref<number>(start_k)
    const isLoader = ref<boolean>(false)
    
    const k = computed<number>((): number => exploreBeatsStore.k)

    const loadMoreBeats = (): void => {
        isLoader.value = true
        setTimeout(() => {
            exploreBeatsStore.k += 20
            isLoader.value = false
        },2000)
    }
    
    const onScroll = (e: any): void => {
        let height: number = e.target.scrollingElement.offsetHeight
        let scrollY = window.scrollY+window.outerHeight
        let total_beats: number = beats_length
        if((height <= scrollY && isLoader.value == false) && (k.value < total_beats)){
            loadMoreBeats()
        }     
    }

    return { k, isLoader, onScroll }
}