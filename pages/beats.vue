<template>
    <div v-scroll="onScroll">
        <v-container 
            class="pt-0"
            :class="$vuetify.display.mdAndUp ? 'px-4' : 'px-0'" 
            fluid
        >
            <Slider title="Promotions" scroll-key="none">
                <Promotions />
            </Slider>
        </v-container>
        <v-container 
            class="pt-0"
            :class="$vuetify.display.mdAndUp ? 'px-4' : 'px-0'" 
            fluid
        >
            <Slider title="EasyBeatz Picks" scroll-key="playlists">
                <PlaylistsSlider />
            </Slider>
        </v-container>
        <v-container
            class="py-0" 
            :class="$vuetify.display.mdAndUp ? 'px-4' : 'px-0'"
            fluid
        >
            <BeatsListTitle :class="$vuetify.display.mdAndUp ? 'mx-0' : 'mx-4'">
                Browse Beats
            </BeatsListTitle>
            <Beats :beats="BEATZ" :all_beats="exploreBeatsStore.explore_beats"/>
            <EasyLoader v-if="isLoader" class="easy-wave my-4"/>
        </v-container>
    </div>
</template>
<script lang="ts" setup>
import { useExploreBeats } from "@/store/Beats"

const exploreBeatsStore = useExploreBeats()
const { k, isLoader, onScroll } = useInfiniteScroll(exploreBeatsStore.explore_beats.length)
const title = ref<string>('High Quality Hip Hop beats and more')
const description = ref<string>('Explore our catalog of beats and find the perfect instrumentals for your next project.')
const { seo } = useSEO(title.value, description.value)

const BEATZ = computed(() => {
    return exploreBeatsStore.explore_beats.slice(0, k.value)
})

// onBeforeRouteLeave((to, from) => {
//     nativeScrollStore.scrollTop.beats = window.scrollY
// })

useHead(seo)

</script>
<style scoped>

</style>