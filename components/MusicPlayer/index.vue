<template>
    <div
        v-if="musicPlayerStore.isActive"
        @click.stop="goToPlaying()"
        :class="$vuetify.display.mdAndUp ? 'px-3 py-2 bg-surface container' : ''"
    >   
        <MusicPlayerLarge v-if="$vuetify.display.mdAndUp" />
        <MusicPlayerMobile v-else />
    </div>
</template>
<script lang="ts" setup>
import { useMusicPlayer } from '@/store/MusicPlayer'

const musicPlayerStore = useMusicPlayer()
const route = useRoute()
const router = useRouter()

const goToPlaying = (): void => {
    if(route.name != 'playing-slug'){
        router.push(`/playing/${musicPlayerStore.beat.beat_title_slug}`)
        musicPlayerStore.goBackRoute = route.path  
        return
    }
    router.push(musicPlayerStore.goBackRoute)
}
</script>
<style scoped>
.container {
    position: sticky;
    bottom: 0;
    z-index: 1008;
    overflow: hidden;
}

</style>

