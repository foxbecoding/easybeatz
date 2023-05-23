import { Beat } from '@/utils/types/Beats'
import ApiData from '@/utils/types/ApiData'
import { useSearchBeats } from '@/store/Search'

export const useSearch = () => {
    const config = useRuntimeConfig()
    const router = useRouter()
    const search_results = shallowRef<Beat[]>([])
    const isLoading = ref<boolean>(false)
    const model = ref('') 
    const searchBeatsStore = useSearchBeats()

    const submit = async (): Promise<void> => {
        if(model.value == ''){ return }
        searchBeatsStore.search_results = []
        // router.push(`/search?q=${model.value}`)
        isLoading.value = true

        let dataApi: ApiData = {
            method: 'POST',
            path: config.public.API_SEARCH_BEATS+`?query=${model.value}`
        }

        const { data, error } = await useApiPlus(dataApi)
        // const { data, error } = await useApi(config.public.API_SEARCH_BEATS+`?query=${model.value}`)
        
        if(error.value){
            isLoading.value = false
            console.log(error.value)
            return 
        }

        const { found_beats } = useGetBeats(data.value) 
        search_results.value = found_beats.value
        searchBeatsStore.search_query = model.value
        searchBeatsStore.search_results = search_results.value
        router.push(`/search?q=${model.value}`)
        isLoading.value = false
        searchBeatsStore.show_mobile_search = false
    }

    const submitOnLoad = async (): Promise<void> => {
        if(model.value == ''){ return }
        searchBeatsStore.search_results = []
        
        const apiPath = `${config.public.API_BASE_URL}${config.public.API_SEARCH_BEATS}?query=${model.value}`
        const res = await fetch(apiPath, {
            method: "POST",
            headers: {
                'accept': 'application/json' ,
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json() as Beat[]

        const { found_beats } = useGetBeats(data) 
        search_results.value = found_beats.value
        searchBeatsStore.search_query = model.value
        searchBeatsStore.search_results = search_results.value
    }

    return {
        isLoading,
        model,
        submitOnLoad,
        searchBeatsStore,
        submit
    }
}