<template>
    <div>  
        <v-container fluid>
            <video class="video d-block mx-auto" controls>
                <source 
                    :src="`${baseUrl}/media/videos/${videoPathName}`" 
                    type="video/mp4"
                >
            </video>
        </v-container>
        <v-container v-if="false" :class="$vuetify.display.mdAndUp ? 'ma-4' : ''" fluid>
            <AboutCaption />
        </v-container>
        <v-container v-if="false" fluid>
            <AboutContent />
        </v-container>
        
        <v-container :class="$vuetify.display.mdAndUp ?  'px-7' : ''" fluid>
            <h1 class="pa-4" style="text-align:center">Pricing</h1>
            <Pricing />
        </v-container>

        <v-container :class="$vuetify.display.mdAndUp ?  'px-7' : ''" fluid>
            <h1 class="text-center my-4">FAQ</h1>
            <FAQ  />
        </v-container>

    </div>
</template>
<script lang="ts" setup>
definePageMeta({
    layout: "about-us"
});

const config = useRuntimeConfig()
const baseUrl = config.public.BASE_URL
const videoPathName = ref<string>("easybeatz-vid.mp4")
const title = ref<string>('About us')
const description = ref<string>(`Learn more about ${config.public.SITE_NAME}`)
const { seo } = useSEO(title.value, description.value)

useHead(seo)
</script>

<style scoped>
.video {
    max-width: 1000px;
    width: 100%;
    height: auto;
    border-radius: 24px;
}
</style>