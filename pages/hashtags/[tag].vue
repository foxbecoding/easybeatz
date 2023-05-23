<template>
    <div>
        <v-container
            class="py-0" 
            :class="$vuetify.display.mdAndUp ? 'px-4' : 'px-0'"
            fluid
        >
            <BeatsListTitle :class="$vuetify.display.mdAndUp ? 'mx-0' : 'mx-4'">
                #{{ tag }}
            </BeatsListTitle>
            <Beats :beats="beats" />
        </v-container>
    </div>
</template>

<script lang="ts" setup>
import { Beat } from '@/utils/types/Beats'
import { Hashtag } from '@/utils/types/Hashtag'
import { useHashtags } from '@/store/Hashtags'

const route = useRoute()
const tag = ref<string>(`${route.params.tag}`)
const hashtag = ref<Hashtag>({} as Hashtag)
const hastagStore = useHashtags()
const beats = ref<Beat[]>([])
const seoData = reactive({
    title: `#${tag.value}` as string,
    description: `#${tag.value} beats` as string,
})

const { seo } = useSEO(seoData.title, seoData.description)

// Methods
const getHastag = (): Hashtag => {
    let found = hastagStore.hashtags.find(x  => x.tag === tag.value)
    if(!found){
        throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
    }
    return found as Hashtag
}

onMounted(() => {
    hashtag.value = getHastag()

    //Set Beats
    const { found_beats } = useGetBeats(hashtag.value.beats)
    beats.value = found_beats.value
})

useHead(seo)
</script>