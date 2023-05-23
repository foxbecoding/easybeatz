<template>
    <div>
        <v-container
            class="py-0"
            fluid
        >
            <h1>FAQ</h1>
            <FAQ />
        </v-container>
    </div> 
</template>
<script lang="ts" setup>

const title = ref<string>('FAQ')
const description = ref<string>('Find the answers to our most frequently asked questions')
const { seo } = useSEO(title.value, description.value)

useHead(seo)
</script>