import { Hashtag } from '@/utils/types/Hashtag'

export const useHashtags = defineStore("hashtags", () => {
    //state
    const hashtags = ref<Hashtag[]>([])
    
    //actions
    const init = async (): Promise<void>  => {
        const res = await fetch(`${process.env.API_BASE_URL}${process.env.API_HASHTAGS}`)
        const data = await res.json() as Hashtag[]
        hashtags.value = data
    }

    return { 
        hashtags,
        init
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useHashtags, import.meta.hot));
}