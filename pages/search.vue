<template>
    <div v-if="SHOW">
        <h2 
            class="my-2"
            :class="$vuetify.display.mdAndUp ? 'mx-0' : 'mx-4'"
        >
            Search results for: {{ searchBeatsStore.search_query }}
        </h2>
        <Beats :beats="searchBeatsStore.search_results"/>
    </div>
</template>
<script lang="ts" setup>
import { useSearchBeats } from '@/store/Search'

const config = useRuntimeConfig()
const searchBeatsStore = useSearchBeats()
const route = useRoute()
const { model, submitOnLoad } = useSearch()
const SHOW = computed<boolean>(
    (): boolean => searchBeatsStore.search_results.length > 0 ? true : false
) 

onBeforeMount(() => {
    if(!searchBeatsStore.search_query){
        model.value = String(route.query.q)
        submitOnLoad()
    }
})


useHead({
    title: () => `${searchBeatsStore.search_query}`
})

</script>