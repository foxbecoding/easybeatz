import { Genre, Subgenre } from '@/utils/types/Genre'

export const useGenres = defineStore("genres", () => {
    //state
    const genres = ref<Genre[]>([])
    const subgenres = ref<Subgenre[]>([])
    
    //actions
    const init = async (): Promise<void>  => {
        const res = await fetch(`${process.env.API_BASE_URL}${process.env.API_GENRES}`)
        const data = await res.json()
        genres.value = data.genres as Genre[]
        subgenres.value = data.subgenres as Subgenre[]
    }

    return { 
        genres,
        subgenres,
        init
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useGenres, import.meta.hot));
}