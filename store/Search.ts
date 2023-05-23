import { Beat } from '@/utils/types/Beats'

export const useSearchBeats = defineStore("search-beats", () => {
    //state
    const search_results = shallowRef<Beat[]>([])
    const search_query = ref<string>('')
    const show_mobile_search = ref<boolean>(false)

    return {
        search_results,
        search_query,
        show_mobile_search
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSearchBeats, import.meta.hot));
}