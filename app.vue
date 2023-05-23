<template>
    <div>
        <NuxtLayout>
            <NuxtPage/>
        </NuxtLayout>
    </div>
</template>

<script lang="ts" setup>
import { usePlaying } from '@/store/Playing'
import { useNativeScroll } from '@/store/NativeScroll'

const nativeScrollStore = useNativeScroll() 
const router = useRouter()
const playingStore = usePlaying()


router.beforeEach((to, from) => {
    setIsPlaying(from)
    nativeScroll(from)
})

const nativeScroll = (from: any): void => {
    if(from.name === 'beats'){
        nativeScrollStore.scrollTop.beats = window.scrollY
    }else if(from.name === 'playing-slug'){
        nativeScrollStore.scrollTop.playing = window.scrollY
    }
}

//for now playing page and musicplayer
const setIsPlaying = (from: any) => {
    if(from.name === 'playing-slug'){
        playingStore.isPlayingPage = true
    }else{
        playingStore.isPlayingPage = false
    }
    return true
}
</script>

<style>
.slide-enter-active,
.slide-leave-active {
    transition: transform .3s linear; 
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}
.slide-enter-from {
    transform: translateX(-100%);
}
.slide-leave-to {
    transform: translateX(100%);
}
</style>