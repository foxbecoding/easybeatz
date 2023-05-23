<template>
    <div>
        <v-container
            class="py-0" 
            :class="$vuetify.display.mdAndUp ? 'px-4' : 'px-0'"
            fluid
        >
            <BeatsListTitle  :class="$vuetify.display.mdAndUp ? 'mx-0' : 'mx-4'">
                Beats like - {{ beat.beat_title }}
            </BeatsListTitle>
            <Beats v-if="beats.length > 0" :beats="beats" />
            <EasyLoader v-else class="easy-wave mt-5 mx-auto"/>
        </v-container>
    </div>
</template>

<script lang="ts" setup>
import { useExploreBeats } from '@/store/Beats'
import { Beat } from '@/utils/types/Beats'

const { ssrContext  } = useNuxtApp()
const config = useRuntimeConfig()
const route = useRoute()
const slug = ref<string>(`${route.params.slug}`)
const beats = ref<Beat[]>([])
const beatStore = useExploreBeats()
const beat = ref<Beat>({} as Beat)
const seoData = reactive({
    title: '' as string,
    description: '' as string,
})

// Methods
const getBeat = (beat_slug: string): Beat => {
    let found = beatStore.explore_beats.find(x  => x.beat_title_slug === beat_slug)
    if(!found){
        throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
    }
    return found as Beat
}

const getSimilarBeats = async (): Promise<void> => {
    const apiPath = `${config.public.API_BASE_URL}${config.public.API_SIMILAR_BEATS}${beat.value.pk}/`
    const res = await fetch(apiPath)
    const data = await res.json() as Beat[]
    const { found_beats } = useGetBeats(data) 
    beats.value = found_beats.value
}

onMounted(() => {
    beat.value = getBeat(`${slug.value}`)

    //Set Client side SEO data
    seoData.title = `Similar beats like ${beat.value.beat_title}`
    seoData.description = `Beats similar to ${beat.value.beat_title}`

    //Set Beats
    getSimilarBeats()
})

//Set Serverside SEO data
if (ssrContext) {
    ssrContext.nuxt.hook('app:rendered', () => {
        beat.value = getBeat(`${route.params.slug}`)
        seoData.title = `Similar beats like ${beat.value.beat_title}`
        seoData.description = `Beats similar to ${beat.value.beat_title}`
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
            content: () => `${config.public.BASE_URL}/album-icon.png` 
        },
        { 
            hid: 'og:image:secure_url', 
            property: 'og:image:secure_url', 
            content: () => `${config.public.BASE_URL}/album-icon.png`
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
            content: () => `${config.public.BASE_URL}/album-icon.png` 
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
</style>