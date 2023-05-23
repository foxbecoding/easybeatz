import { Beat } from '@/utils/types/Beats'

export const useExploreBeats = defineStore("explore-beats", () => {
    const explore_beats = shallowRef<Beat[]>([])
    const k = ref<number>(20)
    
    const initExploreBeats = async (): Promise<void>  => {
        const res = await fetch(`${process.env.API_BASE_URL}${process.env.API_EXPLORE_BEATS}`)
        const data = await res.json() as Beat[]
        explore_beats.value = data
    }

    const getExploreBeats = async (): Promise<void> => {
        const config = useRuntimeConfig()
        const {data, error} = await useApi(config.public.API_EXPLORE_BEATS)
        if(error.value){
            console.log(error.value)
            return
        } 
        explore_beats.value = data.value as Beat[]
    }

    const EXPLORE_BEATS = computed(
        () => explore_beats.value
    )

    return { 
        k,
        explore_beats,
        EXPLORE_BEATS, 
        getExploreBeats, 
        initExploreBeats
    }
})

export const useBeatMenu = defineStore("beat-menu", () => {
    const isOptionMenu = ref<boolean>(false)
    const optionMenuBeat = ref<Beat>({} as Beat)
    const optionMenuIndex = ref<number>(0) 

    const openOptionsMenu = (beat: Beat): void => {
        isOptionMenu.value = false
        setTimeout(() => {
            isOptionMenu.value = true
        }, 100);
        optionMenuBeat.value = beat
    }

    return { 
        isOptionMenu,
        optionMenuBeat,
        optionMenuIndex,
        openOptionsMenu
    }
})

export const useBeatDownload = defineStore("beat-download", () => {
    const dialog = ref<boolean>(false)
    const beat = ref<Beat>({} as Beat)
    const isProcessing = ref<boolean>(false)

    return { 
        beat,
        dialog,
        isProcessing
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useExploreBeats, import.meta.hot));
    import.meta.hot.accept(acceptHMRUpdate(useBeatMenu, import.meta.hot));
    import.meta.hot.accept(acceptHMRUpdate(useBeatDownload, import.meta.hot));
}