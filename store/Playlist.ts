import { Playlist } from '@/utils/types/Playlist'

export const usePlaylists = defineStore("playlist", () => {
    const playlists = shallowRef<Playlist[]>([])
    const scrollLeft = ref<number>()
  
    const init = async (): Promise<void>  => {
        const res = await fetch(`${process.env.API_BASE_URL}${process.env.API_PLAYLISTS}`)
        const data = await res.json() as Playlist[]
        playlists.value = data
    }

    return { 
        playlists,
        scrollLeft,
        init
    }
})


if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePlaylists, import.meta.hot));
}