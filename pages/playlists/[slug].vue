<template>
    <div style="position: relative;">
        <div 
            v-if="playlist.image"
            class="bg-image"
            :style="{backgroundImage: `url(/media/${playlist.image})`}"
        >
        </div>
        <div class="content">
            <v-container 
                class="pt-0 px-0" 
                fluid
            >
                <Slider title="EasyBeatz Picks" scroll-key="playlists">
                    <PlaylistsSlider />
                </Slider>
            </v-container>
            <v-container 
                :class="$vuetify.display.mdAndUp ? 'px-4' : 'px-0'"
                style="z-index: 10"
                fluid
            >
                <BeatsListTitle :class="$vuetify.display.mdAndUp ? 'mx-0' : 'mx-4'">
                    {{ playlist?.title }}
                </BeatsListTitle>
                <Beats :beats="beats" />
            </v-container>
        </div>  
    </div>
</template>

<script lang="ts" setup>
import { usePlaylists } from '@/store/Playlist'
import { Playlist } from '@/utils/types/Playlist'
import { Beat } from '@/utils/types/Beats'

const { ssrContext  } = useNuxtApp()
const config = useRuntimeConfig()
const route = useRoute()
const slug = ref<string>(`${route.params.slug}`)
const beats = ref<Beat[]>([])
const playlistStore = usePlaylists()
const playlist = ref<Playlist>({} as Playlist)
const seoData = reactive({
    title: '' as string,
    description: '' as string,
    image: '' as  string
})


// Methods
const getPlaylist = (slug: string): Playlist => {
    let found = playlistStore.playlists.find(x  => x.slug === slug)
    if(!found){
        throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
    }
    return found as Playlist
}

onMounted(() => {
    // Set current playlist beat
    playlist.value = getPlaylist(`${slug.value}`)

    //Set Client side SEO data
    seoData.title = playlist.value.title
    seoData.description = playlist.value.description
    seoData.image = playlist.value.image

    //Set Beats
    const { found_beats } = useGetBeats(playlist.value.beats)
    beats.value = found_beats.value
})

//Set Serverside SEO data
if (ssrContext) {
    ssrContext.nuxt.hook('app:rendered', () => {
        playlist.value = getPlaylist(`${route.params.slug}`)
        seoData.title = playlist.value.title
        seoData.description = playlist.value.description
        seoData.image = playlist.value.image
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
            content: () => seoData.image ? `${config.public.BASE_URL}/media/${seoData.image}` : '' 
        },
        { 
            hid: 'og:image:secure_url', 
            property: 'og:image:secure_url', 
            content: () => seoData.image ? `${config.public.BASE_URL}/media/${seoData.image}` : ''
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
            content: () => seoData.image ? `${config.public.BASE_URL}/media/${seoData.image}` : '' 
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

<style scoped>
.bg-image {
    
    /* Add the blur effect */
    filter: blur(8px);
    -webkit-filter: blur(8px);
    
    /* Full height */
    height: 100vh; 
    opacity: 0.2;
    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: fixed;
    width: 100%;
    transform: translateX(-50%);
    left: 50%
    
}
.content {
    z-index: 2;
}
.playlist-image{
    width: 100%;
    max-width: 260px;
    height: auto;
    max-height: 160px;
}
</style>