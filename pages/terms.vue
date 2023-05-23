<template>
    <div>
        <v-container
            class="py-0" 
            fluid
        >
            <h1>Terms</h1>
            <TermsIntro />
            <TermsServices />
            <TermsUseOfServices />
            <TermsContentRights />
            <TermsSupport />
            <TermsDisputes />
            <TermsAboutTerms />
        </v-container>
    </div>
</template>
<script lang="ts" setup>


const seoData = reactive({
    title: 'Terms of use',
    description: 'Terms of use that governs the EasyBeatz website and assets'
})

const { seo } = useSEO(seoData.title, seoData.description)

useHead(seo)
</script>
<style scoped> 
</style>