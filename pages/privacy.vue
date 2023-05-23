<template>
    <div>
        <v-container
            class="py-0"
            fluid
        >
            <h1>Privacy</h1>
            <PrivacyIntro />
            <PrivacyChildren />
            <PrivacyCollection />
            <PrivacyPersonalData />
            <PrivacySecure />
        </v-container>
    </div>
</template>
<script lang="ts" setup>

const seoData = reactive({
    title: 'Privacy policy',
    description: 'Our privacy policy that protects our users and their data'
})

const { seo } = useSEO(seoData.title, seoData.description)

useHead(seo)
</script>
<style scoped> 
</style>