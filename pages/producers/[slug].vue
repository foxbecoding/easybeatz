<template>
    <div>
        <v-container
            class="py-0" 
            :class="$vuetify.display.mdAndUp ? 'px-4' : 'px-0'"
            fluid
        >
            <BeatsListTitle :class="$vuetify.display.mdAndUp ? 'mx-0' : 'mx-4'">
                Beats by {{ producer.og_username }}
            </BeatsListTitle>
            <Beats :beats="beats" />
        </v-container>
    </div>
</template>

<script lang="ts" setup>
import { Beat } from '@/utils/types/Beats'
import { Producer } from '@/utils/types/Producer'
import { useProducers } from '@/store/Producers'

const { ssrContext  } = useNuxtApp()
const config = useRuntimeConfig()
const route = useRoute()
const slug = ref<string>(`${route.params.slug}`)
const producer = ref<Producer>({} as Producer)
const producerStore = useProducers()
const beats = ref<Beat[]>([])
const seoData = reactive({
    title: '' as string,
    description: '' as string,
})

// Methods
const getProducer = (producer_slug: string): Producer => {
    let found = producerStore.producers.find(x  => x.username === producer_slug)
    if(!found){
        throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
    }
    return found as Producer
}

onMounted(() => {
    producer.value = getProducer(slug.value)

    //Set Client side SEO data
    seoData.title = `${producer.value.og_username}`
    seoData.description = `${producer.value.og_username} beats.`

    //Set Beats
    const { found_beats } = useGetBeats(producer.value.beats)
    beats.value = found_beats.value
})

//Set Serverside SEO data
if (ssrContext) {
    ssrContext.nuxt.hook('app:rendered', () => {
        producer.value = getProducer(`${route.params.slug}`)
        seoData.title = `${producer.value.og_username}`
        seoData.description = `${producer.value.og_username} beats.`
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