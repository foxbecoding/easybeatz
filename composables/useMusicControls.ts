import { useMusicPlayer } from '@/store/MusicPlayer'
import MusicPlayerBtn from '@/utils/types/MusicPlayerBtn'

export const useMusicControls = () => {
    const route = useRoute()
    const router = useRouter()
    const musicPlayerStore = useMusicPlayer()
    const musicControlBtns = ref<MusicPlayerBtn[]>([
        {
            id: 1, 
            show:  true,
            name: 'shuffle',
            color:'',
            icon: 'mdi-shuffle-variant',  
            tooltipText: 'Shuffle', 
            tooltipActivator: 'parent',
            clickHandler: musicPlayerStore.shuffle
        },
        {
            id: 2, 
            show: true,
            name: 'previous',
            color:'',
            icon: 'mdi-skip-previous', 
            tooltipText: 'Previous', 
            tooltipActivator: 'parent', 
            clickHandler: musicPlayerStore.prevBeat
        },
        {
            id: 3, 
            show: true,
            name: 'play_pause',
            color:'',
            icon: 'mdi-play', 
            tooltipText: 'Play', 
            tooltipActivator: 'parent', 
            clickHandler: musicPlayerStore.play_pause
        },
        {
            id: 4, 
            show: true,
            name: 'next',
            color:'',
            icon: 'mdi-skip-next',  
            tooltipText: 'Next', 
            tooltipActivator: 'parent', 
            clickHandler: musicPlayerStore.nextBeat
        },
        {
            id: 5, 
            show:  true,
            name: 'loop',
            color:'',
            icon: 'mdi-repeat',  
            tooltipText: 'Loop', 
            tooltipActivator: 'parent',
            clickHandler: musicPlayerStore.loop
        }
    ])

    const LOCATION_ICON = computed(
        () => route.name !== 'playing-slug' ? 'mdi-location-enter' : 'mdi-location-exit'    
    )

    const setLoopBtnData = (): void => {
        let btn: any = musicControlBtns.value.find(x => x.name == 'loop')
        if(musicPlayerStore.isLoop){
            btn.color = 'primary'
            return
        }
        btn.color = ''
    }
    
    const setShuffleBtnData = (): void => {
        let btn: any = musicControlBtns.value.find(x => x.name == 'shuffle')
        if(musicPlayerStore.isShuffled){
            btn.color = 'primary'
            return
        }
        btn.color = ''
    }
    
    const setPlayPauseBtnData = (): void => {
        let btn: any = musicControlBtns.value.find(x => x.name == 'play_pause')
        if (!musicPlayerStore.isPaused){
            btn.icon = 'mdi-pause'
            btn.tooltipText = 'Pause'
            return
        }
        btn.icon = 'mdi-play'
        btn.tooltipText = 'Play'
    }
    
    const goToPlaying = (): void => {
        if(route.name != 'playing-slug'){
            router.push(`/playing/${musicPlayerStore.beat.beat_title_slug}`)
            musicPlayerStore.goBackRoute = route.path  
            return
        }
        router.push(musicPlayerStore.goBackRoute)
    }

    return {
        LOCATION_ICON,
        musicControlBtns,
        musicPlayerStore,
        route, 
        setLoopBtnData,
        setShuffleBtnData,
        setPlayPauseBtnData,
        goToPlaying
    }
}