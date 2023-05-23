import { useExploreBeats } from "./Beats"
import { usePricePackages } from "./PricePackages"
import { usePlaylists } from './Playlist'
import { useGenres } from './Genres'
import { useHashtags } from './Hashtags'
import { useProducers } from './Producers'
import { useFAQS } from './FAQ'

export const useRootStore = defineStore("root", () => {
    const exploreBeatsStore = useExploreBeats()
    const pricePackagesStore = usePricePackages()
    const playlistStore = usePlaylists()
    const genreStore = useGenres()
    const hashtagStore = useHashtags()
    const producerStore = useProducers()
    const faqStore = useFAQS()
   
    //methods
    const initServer = async (): Promise<void> => {
        await exploreBeatsStore.initExploreBeats()
        await playlistStore.init()
        await genreStore.init()
        await hashtagStore.init()
        await producerStore.init()
        await pricePackagesStore.init()
        await faqStore.init()
    }
    
    return { 
        initServer
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useRootStore, import.meta.hot));
}