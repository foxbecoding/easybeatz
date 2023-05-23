<template>
    <div>  
        <v-container :class="$vuetify.display.mdAndUp ? 'ma-4' : ''" fluid>
            <AboutCaption />
        </v-container>
        <v-container fluid>
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
const title = ref<string>('About us')
const description = ref<string>(`Learn more about ${config.public.SITE_NAME}`)
const { seo } = useSEO(title.value, description.value)

useHead(seo)
</script>