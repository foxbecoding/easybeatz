<template>
    <div>
        <Beats :beats="musicPlayerStore.queue"  />
    </div>
</template>
    
<script lang="ts" setup>
import { useMusicPlayer } from "@/store/MusicPlayer"

const musicPlayerStore = useMusicPlayer() 
</script>
<style scoped>
</style>