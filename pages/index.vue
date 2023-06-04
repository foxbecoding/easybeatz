<template>
    <div>
        <v-container
            class="pb-12" 
            :class="$vuetify.display.mdAndUp ? 'ma-4' : ''" 
            fluid
        >
            <HomeCaption />
        </v-container>
        <v-container fluid>
            <AboutContent />
        </v-container>
        <v-container 
            v-if="false"
            class="py-12" 
            :class="$vuetify.display.mdAndUp ? 'px-7' : ' px-0'" 
            fluid
        >
            <h1 class="px-4" style="text-align:center">EasyBeatz makes it easy for you</h1>
            
            <div 
                :class="$vuetify.display.mdAndUp ? 'd-flex justify-center' : 'd-block mx-auto card-content-sm' "
                class=" mt-4"
            >
                <v-card 
                    v-for="content in easyContent"
                    :key="content.id"
                    :class="$vuetify.display.mdAndUp ? 'mx-4' :  'my-4' "
                    color="transparent"
                    flat
                    width="260px"
                >          
                    <v-img 
                        class="rounded-xl card-content"
                        aspect-ratio="4/3"
                        cover 
                        width="260px"
                        height="160px"
                        :alt="content.title"
                        :src="content.img_src" 
                    />
                    
                    <v-card-title 
                        class="text-wrap" 
                        style="line-height: 1.5rem"
                    >
                        {{ content.title }}
                    </v-card-title>
                    <v-card-subtitle class="text-wrap">
                        {{ content.text }}
                    </v-card-subtitle>
                </v-card>
            </div>  
        </v-container>
        <v-container 
            class="py-12" 
            :class="$vuetify.display.mdAndUp ? 'px-7' : ' px-0'" 
            fluid
        >
            <h1 class="pa-4" style="text-align:center">Premium Beats</h1>
            <Beats :beats="beats" />
            <div class="my-4 text-center">
                <v-btn 
                    class="text-background" 
                    to="/beats" 
                    rounded="xl" 
                    color="primary"
                    variant="outlined"
                >   
                    <v-icon class="mr-4">mdi-music</v-icon>
                    Beats
                </v-btn>
            </div>   
        </v-container>
        <v-container class="py-12" :class="$vuetify.display.mdAndUp ? 'px-7' : ''" fluid>
            <h1 class="px-4" style="text-align:center">Pricing</h1>
            <Pricing />
            <div class="my-4 text-center">
                <v-btn 
                    class="text-background" 
                    to="/pricing" 
                    rounded="xl" 
                    color="primary"
                    variant="outlined"
                >   
                    <v-icon class="mr-4">mdi-information</v-icon>
                    Pricing
                </v-btn>
            </div> 
        </v-container>
        <v-container class="pt-12" :class="$vuetify.display.mdAndUp ? 'px-7' : ''" fluid>
            <h1 class="text-center my-4">FAQ</h1>
            <FAQ  />
            <div class="my-4 text-center">
                <v-btn 
                    class="text-background" 
                    to="/faq" 
                    rounded="xl" 
                    color="primary"
                    variant="outlined"
                >   
                    <v-icon class="mr-4">mdi-frequently-asked-questions</v-icon>
                    FAQ
                </v-btn>
            </div> 
        </v-container>    
    </div>
</template>
<script lang="ts" setup>
import { Beat } from '@/utils/types/Beats'
import { useExploreBeats } from '@/store/Beats'

definePageMeta({
    layout: "home"
});

interface EasyContent {
    id: number
    title: string
    text: string
    img_src: string
}

const title = ref<string>('Unlimited High Quality Beats')
const description = ref<string>('Discover high quality instrumentals produced by industry standard producers.')
const { seo } = useSEO(title.value, description.value)
const explore_beats = useExploreBeats()
const beats = ref<Beat[]>([])
const easyContent = ref<EasyContent[]>([
    {
        id: 1, 
        title: 'High Quality Beats',
        text: 'Enjoy access to an Unlimited supply of High Quality Beats at your disposal',
        img_src: '/media/content/ai-music.png'
    },
    {
        id: 2, 
        title: 'Easily Buy Beats with Tokens',
        text: `
                Purchasing beats has never been easier! 
                With our unique token based system, you can get 
                unlimited beats at any time.
                1 token = 1 beat
            `,
        img_src: '/media/content/tokens-bg.png'
    },
    {
        id: 3, 
        title: 'EasyBeatz Producers',
        text: `
                Each Producer has been hand-picked and
                shown a proven long term track record of 
                high-end material, suitable for all use cases.
                With our diverse catalog of music, 
                you are able to find music for any occassion!
            `,
        img_src: '/media/content/music-producer.png'
    }
])


onBeforeMount(() => {
    let new_list: Beat[] =  [...explore_beats.explore_beats]
    new_list.sort(() => Math.random() - 0.5)
    beats.value = new_list.slice(3, 9)
})

useHead(seo)
</script>
<style scoped> 

.card-content-sm{
    width: 260px;
    margin-top: 4px;
}

</style>