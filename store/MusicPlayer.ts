import { Beat } from '@/utils/types/Beats'
import ApiData from '@/utils/types/ApiData'

export const useMusicPlayer = defineStore("music-player", () => {
    //state
    const audio = ref<HTMLAudioElement>({} as HTMLAudioElement)
    const beat = ref<Beat>({} as Beat)
    const beats = shallowRef<Beat[]>([])
    const currentTime = ref<number>(0)
    const currentTimeStr = ref<string>('0:00') 
    const duration = ref<number>(80)
    const durationStr = ref<string>('1:20')
    const isActive =  ref<boolean>(false)
    const isEnded = ref<boolean>(false)
    const isLoop = ref<boolean>(false)
    const isMuted = ref<boolean>(false)
    const isPaused = ref<boolean>(true)
    const isShuffled = ref<boolean>(false)
    const isSliding = ref<boolean>(false)
    const queue = shallowRef<Beat[]>([])
    const queueIndex = ref<number>(0)
    const timeInterval = ref()
    const volume = ref<number>(1)
    const goBackRoute = ref<string>('/')
    const isPlayingPage = ref<boolean>(false)

    //getters
    const IS_QUEUE = computed<boolean>((): boolean => {
        return queue.value.length > 0 ? true : false
    })

    const PLAYING_QUEUE = computed(() => queue.value)

    const CURRENT_TIME_STR = computed<string>((): string => {
        let hrs: number = ~~(currentTime.value / 3600)
        let mins: number = ~~((currentTime.value % 3600) / 60)
        let secs: number = ~~currentTime.value % 60
        let ret: string = ""
      
        hrs > 0 ? ret += "" + hrs + ":" + (mins < 10 ? "0" : "") : ''
      
        ret += "" + mins + ":" + (secs < 10 ? "0" : "")
        ret += "" + secs
        return ret
    })

    //actions
    const trackBeat = (beatData: Beat): void => {
        const config = useRuntimeConfig()
        let data: ApiData = {
            data: { beat: beatData.pk },
            method: 'POST',
            path: `${config.public.API_BEAT_PLAYS}`
        }
        useApiPlus(data)
    }

    const audioEndedEvents = (): void => {
        audio.value.addEventListener('ended', () => {
            if(audio.value.ended){ 
                isEnded.value = true
                nextBeat() 
            }        
        })
    }

    const setCurrentTime = (): void => {
        currentTime.value = audio.value.currentTime
    }

    const audioTimeUpdateEvents =  (): void => {
        timeInterval.value
        timeInterval.value = setInterval(() => {
            currentTime.value = audio.value.currentTime
        }, 1000)
    }

    const loop = (): void => {
        isLoop.value = !isLoop.value
        audio.value.loop = isLoop.value
    }

    const nextBeat = (): void => {
        timeInterval.value && clearInterval(timeInterval.value)
        if(queueIndex.value < queue.value.length - 1){
            queueIndex.value+=1
            let queueBeat: Beat = queue.value[queueIndex.value]
            beat.value = queueBeat
            setAudio(`/media/${queueBeat.beat_file}`)
            play_pause()
            trackBeat(queueBeat)
        } 
    }

    const play_pause = async (): Promise<void> => {
        if(!audio.value.paused){
            timeInterval.value && clearInterval(timeInterval.value)
            audio.value.pause()
            isPaused.value = true
            return
        }       
        let play_promise = audio.value.play()
        audioTimeUpdateEvents()    
        if(play_promise !== undefined){    
            try {
                await play_promise
                isPaused.value = false
            } catch (error) {
                // console.log(error)
            }
        }       
    }

    const prevBeat = (): void => {
        timeInterval.value
        clearInterval(timeInterval.value)
        if(currentTime.value > 3){
            audio.value.currentTime = 0
            trackBeat(beat.value)
            return
        }
        if(queueIndex.value > 0){
            queueIndex.value-=1
            let queueBeat: Beat = queue.value[queueIndex.value];
            beat.value = queueBeat
            setAudio(`/media/${queueBeat.beat_file}`)
            trackBeat(queueBeat)
        } 
        play_pause()
    }

    const setAudio = (audioFile: string): void => {
        setRoute()
        if(audio.value.src){
            audio.value.src = ''
            // audio.value.load()
        }else{ 
            audio.value = new Audio() 
            audioEndedEvents()
            audioTimeUpdateEvents()
        }
        audio.value.src = audioFile
        audio.value.muted = isMuted.value
        audio.value.loop = isLoop.value
        audio.value.volume = volume.value
        setMediaSessionData()
    }

    const setBeatsQueue = (
        beatData: Beat, 
        beatsData: Beat[],
        queueData: Beat[],
        index: number = queueIndex.value,
        is_purchased: boolean
        ): void => {
        duration.value = 80
        durationStr.value = '1:20'
        if(is_purchased){
            duration.value = beatData.beat_duration_secs
            durationStr.value = beatData.beat_duration
        }
        beat.value = beatData
        beats.value = beatsData
        queue.value = queueData
        queueIndex.value = index
        if(!isPlayingPage.value){ isShuffled.value ? shuffle() : ''; }
        trackBeat(beatData)
    }

    const setMediaSessionData = (): void => {   
        if('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: beat.value.beat_title,
                artist: beat.value.user.og_username,
                album: 'easybeatz.com',
                artwork: [{src: `/album-icon.png`}]
            });
            navigator.mediaSession.setActionHandler('play', () => { play_pause() })
            navigator.mediaSession.setActionHandler('pause', () => { play_pause() })
            navigator.mediaSession.setActionHandler('previoustrack', () => { prevBeat() })
            navigator.mediaSession.setActionHandler('nexttrack', () => { nextBeat() })
        }  
    }

    const setRoute = (): void => {
        const route = useRoute()
        const router =  useRouter()
        if(route.name === 'playing-slug'){
            router.push(`/playing/${beat.value.beat_title_slug}`)
        }
    }

    const shuffle = (): void => {
        if(!isShuffled.value){
            let new_list: Beat[] = [...queue.value]
            new_list.sort(() => Math.random() - 0.5)
            new_list.forEach((beatData: Beat, i: number): void => {
                if(beatData.pk === beat.value.pk){
                    new_list.splice(i, 1)
                    new_list.unshift(beatData)
                }
            })
            queue.value = new_list
            isShuffled.value = true
            return
        }
        queue.value = beats.value
        isShuffled.value = false
    }

    return {
        audio,
        beat, 
        beats,
        currentTime,
        currentTimeStr,
        duration,
        durationStr,
        goBackRoute,
        isActive,
        isLoop,
        isPaused,
        isPlayingPage,
        isShuffled,
        isSliding,
        queue,
        queueIndex,
        timeInterval,
        PLAYING_QUEUE,
        IS_QUEUE,
        CURRENT_TIME_STR,
        audioTimeUpdateEvents,
        loop,
        nextBeat,
        play_pause,
        prevBeat,
        setAudio,
        setBeatsQueue,
        shuffle
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMusicPlayer, import.meta.hot));
}