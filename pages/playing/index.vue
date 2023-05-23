<template>
</template>

<script lang="ts" setup>
import { useExploreBeats } from "@/store/Beats"
import { Beat } from "@/utils/types/Beats"

const exploreBeatsStore = useExploreBeats()
const beat = ref<Beat>(exploreBeatsStore.explore_beats[0])
if(beat.value){
    useRouter().push(`/playing/${beat.value.beat_title_slug}`)
}
</script>