<template>
    <div>
        <h1 class="text-h4 font-weight-black ma-4">Browse Genres</h1>
        <v-container
            v-for="(genre, i) in genreStore.genres"
            :key="genre.pk"
            class="pt-0 mb-4" 
            :class="$vuetify.display.mdAndUp ? 'px-4' : 'px-0'"
            fluid
        >
            <BeatsListTitle  
                class="text-h5 font-weight-bold" 
                :class="$vuetify.display.mdAndUp ? 'mx-0' : 'mx-4'"
            >
                {{ genre.og_genre.toUpperCase() }}
            </BeatsListTitle>
            <Beats :beats="setBeats(genre.beats)" />
            <div class="text-center">
                <v-btn 
                    class="my-4"
                    :to="`/genres/${genre.genre}`"
                    color="primary"
                    variant="outlined"
                    rounded="xl"
                >
                    View More
                </v-btn>
            </div>
        </v-container>
    </div>
</template>

<script lang="ts" setup>
import { useGenres } from '@/store/Genres'
import { Beat } from '@/utils/types/Beats'

const genreStore = useGenres()
const seoData = reactive({
    title: 'Genres',
    description: 'Explore our genres and discover industry standard production instrumentals'
})
const { seo } = useSEO(seoData.title, seoData.description)

const setBeats = (beats: string[]|number[]): Beat[] => {
    const { found_beats } = useGetBeats(beats)
    return found_beats.value.slice(0, 3)
}

useHead(seo)
</script>

<style scoped>
</style>