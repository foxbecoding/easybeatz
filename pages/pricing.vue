<template>
    <div>
        <h1 class="px-4" style="text-align:center">Pricing</h1>
        <v-container class="px-4 pt-0" fluid>
            <Pricing />
        </v-container>
        <v-container class="px-4" fluid>
            <h1 class="text-center my-4">FAQ</h1>
            <FAQ  />
        </v-container>
    </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "price-plans"
});

const seoData = reactive({
    title: 'Pricing',
    description: 'We offer four affordable pricing plans that will cater to your needs.'
})

const { seo } = useSEO(seoData.title, seoData.description)

useHead(seo)
</script>