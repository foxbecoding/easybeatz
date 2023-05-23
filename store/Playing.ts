import { Beat } from '@/utils/types/Beats'

export const usePlaying = defineStore("playing", () => {  
    const isPlayingPage = ref<boolean>(false)
    const isSimilar = ref<boolean>(false)
    const beatForSimilar = ref<Beat>({} as Beat)
    const similarBeats = ref<Beat[]>([])
    const isSimilarBeatsPlaying = ref<boolean>(false)
    const currentQueue = ref<Beat[]>([])
    
    return {
        isPlayingPage,
        isSimilar,
        similarBeats,
        beatForSimilar,
        isSimilarBeatsPlaying,
        currentQueue
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePlaying, import.meta.hot));
}