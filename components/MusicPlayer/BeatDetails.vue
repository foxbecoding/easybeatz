<template>
    <div class="mp-beat-details-block">
        <p class="mp-beat-title">{{ musicPlayerStore.beat.beat_title }}</p>
        <p class="mp-beat-producer">{{ musicPlayerStore.beat.user.og_username }}</p>
    </div>
</template>
<script lang="ts" setup>
import { useMusicPlayer } from '@/store/MusicPlayer'

const musicPlayerStore = useMusicPlayer()

</script>
<style scoped>
.mp-beat-details-block {
    width: 200px;
    white-space: nowrap;
}
.mp-beat-title {
    overflow: hidden;
    text-overflow: ellipsis;
}
.mp-beat-producer {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.875rem;
    opacity: 0.8
}
</style>

