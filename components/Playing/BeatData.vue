<template>
    <v-container   
		class="pa-4 container" 
		fluid
        v-if="musicPlayerStore.queue.length > 0"
    > 
        <div class="d-flex flex-column">
            <div class="content-container">
                <h1 class="text-h5 font-weight-bold">
                    {{BEAT.beat_title}}
                </h1>
                <NuxtLink 
                    class="text-subtitle-1 producer-name font-weight-bold text-medium-emphasis"
                    :to="`/producers/${musicPlayerStore.beat.user.username}`" 
                >
                    {{ musicPlayerStore.beat.user.og_username }}
                </NuxtLink>
            </div>
            <div class="content-container">
                <NuxtLink 
                    v-for="tag in musicPlayerStore.beat.hashtags" 
                    class="mr-1 text-primary font-weight-bold hashtags" 
                    :to="`/hashtags/${tag.tag}`"
                >
                    #{{tag.tag}}
                </NuxtLink>
            </div>
            <div>
                <p class="text-subtitle-1 font-weight-bold text-large-emphasis">
                    {{ musicPlayerStore.beat.beat_seo}}
                </p>
            </div>
            <div class="my-1">
                <v-chip
                    class="mr-1 mt-1"
                    color="primary"
                    :to="`/genres/${musicPlayerStore.beat.genre.genre}`"
                >
                    {{ musicPlayerStore.beat.genre.og_genre.toUpperCase() }}
                </v-chip>
            </div>
            <div class="my-1">
                <v-chip>
                    DURATION: {{ musicPlayerStore.beat.beat_duration.toUpperCase() }}
                </v-chip>
            </div>
            <div class="my-1">
                <v-chip
                    class="mr-1 mt-1 text-background"
                    color="primary"
                    variant="flat"
                    :to="`/similar-beats/${musicPlayerStore.beat.beat_title_slug}`"
                >
                    SIMILAR BEATS
                </v-chip>
            </div>
        </div>
    </v-container>
</template>
    
<script lang="ts" setup>
import { Beat } from '@/utils/types/Beats'
import { useMusicPlayer } from "@/store/MusicPlayer"

const musicPlayerStore = useMusicPlayer() 
const BEAT = computed<Beat>(
    (): Beat => musicPlayerStore.beat 
)

</script>
<style scoped>
.content-container {
    max-width: 350px;
    width: 100%;
}
.hashtags {
    text-decoration: none;
}
.hashtags:hover {
    opacity: 0.75;
}

.producer-name {
    text-decoration: none;
}

.producer-name:hover {
    opacity: 0.65;
}

.text-subtitle-1{
    line-height: 1.45rem !important;
}
</style>