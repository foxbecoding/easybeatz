import { Beat } from '@/utils/types/Beats'
import { useExploreBeats } from '@/store/Beats'
import { useMusicPlayer } from '@/store/MusicPlayer'
import { useSnackbar } from '@/store/Snackbar'

export const useBeatOptions = () => {
    interface BeatOption {
        id: number
        name: string
        label: string
        icon: string
    }
    
    const config = useRuntimeConfig()
    const beats = useExploreBeats().explore_beats
    const musicPlayerStore = useMusicPlayer()
    const snackbar = useSnackbar()
    const beatOptions = ref<BeatOption[]>([
        // {
        //     id: 1, 
        //     name: 'play-next', 
        //     label: 'Play Next', 
        //     icon: 'mdi-playlist-play'
        // },
        // {
        //     id: 2, 
        //     name: 'play-last', 
        //     label: 'Play Last', 
        //     icon: 'mdi-playlist-plus'
        // },
        {
            id: 3, 
            name: 'share', 
            label: 'Share', 
            icon: 'mdi-share' 
        },
        {
            id: 4, 
            name: 'copy', 
            label: 'Copy Link', 
            icon: 'mdi-link-variant' 
        },
        {
            id: 5, 
            name: 'similar-beats', 
            label: 'Similar Beats', 
            icon: 'mdi-music-circle-outline' 
        },
        {
            id: 6, 
            name: 'view-producer', 
            label: 'View Producer', 
            icon: 'mdi-account-music' 
        },
    ])

    const playNext = (beat: Beat): void => {
        let newQueue = [...musicPlayerStore.queue]
        
        if(musicPlayerStore.queueIndex == 0 && musicPlayerStore.queue.length == 0){
            musicPlayerStore.queue.push(beat)
            return
        }

        newQueue.splice(musicPlayerStore.queueIndex+1, 0, beat)
        musicPlayerStore.beats = newQueue
        musicPlayerStore.queue = newQueue  
    }
    
    const playLast = (beat: Beat): void => {
        musicPlayerStore.queue.push(beat)
    }

    const share = (beat: Beat): void => {
        try {
            navigator.share({
                title: beat.beat_title,
                url: `${config.public.BASE_URL}/playing/${beat.beat_title_slug}`
              })
        } catch (error) {
            
        }
    }
    const copyLink = async (beat: Beat): Promise<void> => {
        try {
            if('clipboard' in navigator) {
                let url = `${config.public.BASE_URL}/playing/${beat.beat_title_slug}`
                await navigator.clipboard.writeText(url);
                snackbar.setSnackbar('Beat link copied', true)
            }
            
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }
    
    const beatOptionHandler = (type: string, beat: Beat): void => {
        switch (type) {
            case 'play-next':
                playNext(beat)
                break;
            case 'play-last':
                playLast(beat)
                break;
            case 'share':
                share(beat)
                break;
            case 'copy':
                copyLink(beat)
                break;
            case 'similar-beats':
                useRouter().push(`/similar-beats/${beat.beat_title_slug}`)
                break;
            case 'view-producer':
                useRouter().push(`/producers/${beat.user.username}`)
                break;
            default:
                break;
        }
    }

    return { 
        beatOptions,
        beatOptionHandler 
    }
}