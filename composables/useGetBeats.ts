import { Beat } from '@/utils/types/Beats'
import { useExploreBeats } from '@/store/Beats'
import { useUser } from '@/store/User'

export const useGetBeats = (data?: any) => {
    const data_beats: [] = data ? data : []
    const userStore = useUser()
    const user = userStore.user
    const user_is_authenticated = userStore.is_authenticated
    const beats = useExploreBeats().explore_beats
    const found_beats = ref<Beat[]>([])

    if(data_beats.length > 0){
        data_beats.forEach((e: any) => {
            let found = beats.find(x => x.pk == e)
            if(found){ 
                found_beats.value.push(found as Beat) 
            }
        })
    }
    
    const enhanceBeats = (): void => {
        if(user_is_authenticated){
            beats.forEach((beat: Beat) => {
                const favorite_beats = user.favorite_beats
                const purchased_beats = user.purchased_beats
                let found_favorite = favorite_beats.find(x => x == beat.pk) 
                let found_purchase = purchased_beats.find(x => x == beat.pk) 
                if(found_favorite) { beat.is_favorite = true }
                if(found_purchase) { beat.is_purchased = true }
            })
        }
    }
    
    return { 
        found_beats, 
        enhanceBeats 
    }
}