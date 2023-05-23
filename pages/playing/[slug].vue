<template>
    <div>
        <PlayingBeatData v-if="$vuetify.display.smAndDown" />
        <div :class="DISPLAY_FLEX">
            <div class="w-100">
                <BeatsListTitle :class="$vuetify.display.mdAndUp ? 'mx-0' : 'mx-4'">
                    Now Playing
                </BeatsListTitle>
                <PlayingQueue v-if="isQueue" />
            </div>       
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useMusicPlayer } from "@/store/MusicPlayer"
import { Beat } from "@/utils/types/Beats"
import { useExploreBeats } from "@/store/Beats"
import { useDisplay } from "vuetify"
import { usePlaying } from '@/store/Playing'

const { ssrContext  } = useNuxtApp()
const config = useRuntimeConfig()
const route = useRoute()
const playingStore = usePlaying()
const beat_slug = ref<string>(`${route.params.slug}`)
const exploreBeatsStore = useExploreBeats()
const musicPlayerStore = useMusicPlayer() 
const beat_playing = ref<Beat>()
const vDisplay = useDisplay()
const seoData = reactive({
    title: '' as string,
    description: '' as string
})

//Computed Properties
const DISPLAY_FLEX = computed(
    () => vDisplay.smAndUp.value ? 'd-flex' : 'd-flex flex-column'
)

const isQueue = computed<boolean>((): boolean => {
    return musicPlayerStore.queue.length > 0 ? true : false
})

// Methods
const getBeat = (slug: string): Beat => {
    let found_beat = exploreBeatsStore.explore_beats.find(x  => x.beat_title_slug === slug)
    if(!found_beat){
        throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
    }
    return found_beat as Beat
}

const setBeats = (beatData: Beat, beatsData: Beat[]): Beat[] => {
    let beat = beatData
    let beats = beatsData
    let beatIndex = beats.findIndex(x => x.pk == beat.pk)
    beats.splice(beatIndex, 1)
    beats.unshift(beat)
    musicPlayerStore.beats = beats
    musicPlayerStore.queue = beats
    return beats
}

onMounted(() => {
    // Set current playing beat
    beat_playing.value = getBeat(beat_slug.value)
    musicPlayerStore.beat = beat_playing.value

    //Set Client side SEO data
    seoData.title = beat_playing.value?.beat_title
    seoData.description = beat_playing.value?.beat_seo

    if(!isQueue.value){
        setBeats(musicPlayerStore.beat, exploreBeatsStore.explore_beats)
        musicPlayerStore.setAudio(`/media/${musicPlayerStore.beat.beat_file}`)
        musicPlayerStore.isActive = true
    }else if(isQueue.value && playingStore.isPlayingPage){
        musicPlayerStore.setAudio(`/media/${musicPlayerStore.beat.beat_file}`)
        musicPlayerStore.play_pause()
    }
})

//Set Serverside SEO data
if (ssrContext) {
    ssrContext.nuxt.hook('app:rendered', () => {
        beat_playing.value = getBeat(`${beat_slug.value}`)
        seoData.title = beat_playing.value?.beat_title
        seoData.description = beat_playing.value?.beat_seo
    })
}

useHead({ 
    title: () => seoData.title,
    meta: [
        { 
            hid: 'description', 
            property: 'description', 
            content: () => seoData.description
        },
        { 
            hid: 'og:site_name', 
            property: 'og:site_name', 
            content: config.public.SITE_NAME
        },
        { 
            hid: 'og:url', 
            property: 'og:url', 
            content: config.public.BASE_URL+route.fullPath
        },
        { 
            hid: 'og:type', 
            property: 'og:type', 
            content: 'website' 
        },
        { 
            hid: 'og:title', 
            property: 'og:title', 
            content: () => `${seoData.title} - ${config.public.SITE_NAME}`
        },
        { 
            hid: 'og:description', 
            property: 'og:description', 
            content: () => seoData.description 
        },
        { 
            hid: 'og:image', 
            property: 'og:image', 
            content: `${config.public.BASE_URL}/album-icon.png` 
        },
        { 
            hid: 'og:image:secure_url', 
            property: 'og:image:secure_url', 
            content: `${config.public.BASE_URL}/album-icon.png` 
        },
        { 
            hid: 'og:image:alt', 
            property: 'og:image:alt', 
            content: `${config.public.SITE_NAME} logo` 
        },
        { 
            hid: 'twitter:card', 
            name: 'twitter:card', 
            content: 'summary_large_image' 
        },
        { 
            hid: 'twitter:url', 
            name: 'twitter:url', 
            content: config.public.BASE_URL+route.fullPath 
        },
        { 
            hid: 'twitter:title', 
            name: 'twitter:title', 
            content: () => `${seoData.title} - ${config.public.SITE_NAME}`
        },
        { 
            hid: 'twitter:description', 
            name: 'twitter:description', 
            content: () => seoData.description
        },
        { 
            hid: 'twitter:image', 
            name: 'twitter:image', 
            content: `${config.public.BASE_URL}/album-icon.png` 
        },
        { 
            hid: 'twitter:image:alt', 
            name: 'twitter:image:alt', 
            content: () => `${seoData.title} - ${config.public.SITE_NAME}`
        },
        { 
            hid: 'twitter:site', 
            name: 'twitter:site', 
            content: `@${config.public.SITE_NAME}`
        },
    ]
})

</script>
<style>
.sticky-content {
    position: sticky;
    top: 56px;
    z-index: 1000;
}

.tab-bar{
    background: rgba(15,15,15,0.1)  !important;
}

.tab-bar:before{
    content: "";
    background: inherit;
    position: absolute;
    width : 100%;
    height: 100%;
    z-index: -1;
    -webkit-backdrop-filter: blur(3px);
    -moz-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
}
</style>