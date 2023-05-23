<template>  
    <v-card 
        @touchstart="onDragStart" 
        @touchend="onDragEnd"
        id="sheet"
        color="surface"
        class="action-sheet"
        :rounded="`t-xl b-none`"
        :style="{
            maxHeight: `${maxHeight}px`,
            height: `${sheetHeight}px`
        }"
    >
        <v-toolbar color="surface" height="20">
            <div class="action-draggable-area py-4 mx-auto">
                <div class="rounded-pill action-draggable-chip"></div>
            </div>
        </v-toolbar>
        <v-card-text class="pa-0 action-content">
            <div class="mx-4 d-flex justify-space-between">
                <MusicPlayerBeatDetails />
                <v-spacer />
                <v-btn 
                    @click.stop="isDown = !isDown"
                    flat
                    :icon="isDown ? 'mdi-arrow-up-thin-circle-outline' : 'mdi-arrow-down-thin-circle-outline'" 
                />
                <MusicPlayerNowPlayingBtn />
            </div>    
            <div class="mx-auto mt-4 text-center" style="width: 100%; max-width: 500px;">
                <MusicPlayerSlider class="mx-4 mb-4" style="box-sizing: border-box;"/>
                <MusicPlayerControls />
                <MusicPlayerBeatMethods />
            </div>
        </v-card-text>
    </v-card>
</template>
<script lang="ts" setup>
import { useLayoutsStore } from '@/store/Layouts'

const layoutStore = useLayoutsStore()
const dragPosition = ref<any>()
const sheetHeight = ref<any>(75)
const maxHeight = ref<number>(230)
const minHeight = ref<number>(75)
const isDown = ref<boolean>(true)

onMounted(() => {
    setTimeout(() => {
        window.addEventListener("touchmove", onDragMove)
        window.addEventListener("touchend", onDragEnd)
    }, 1000)    
})

watch(isDown, () => {
    if(isDown.value){
        setSheetHeight(75)
    }else{
        setSheetHeight(maxHeight.value)
    }
})

const setSheetHeight = (value: any) => {
    let height = Math.max(0, Math.min(maxHeight.value, value))
    if(height >= minHeight.value){
        sheetHeight.value = height
        return
    }
    sheetHeight.value = minHeight.value
}

const touchPosition = (event: any) => event.touches ? event.touches[0] : event

const onDragStart = (event: any) => dragPosition.value = touchPosition(event).pageY

const onDragMove = (event: any) => {
    if (dragPosition.value === undefined) return
    const y = touchPosition(event).pageY
    const deltaY = dragPosition.value - y
    const deltaHeight = deltaY / window.innerHeight * 500
    setSheetHeight(sheetHeight.value + deltaHeight)
    dragPosition.value = y
}
const onDragEnd = () => {
    dragPosition.value = undefined
    if (sheetHeight.value > 190) {
        setSheetHeight(maxHeight.value)
        layoutStore.mobileAdjust = maxHeight.value
        isDown.value = false
    } else {
        setSheetHeight(minHeight.value)
        layoutStore.mobileAdjust = minHeight.value
        isDown.value = true
    }
}
</script>

<style scoped>
.action-sheet {
    position: fixed;
    bottom: 65px;
    left: 0;
    z-index: 100;
    width: 100%;
    touch-action: none !important;
}

.action-content{
    touch-action: none;
}

.action-draggable-area {
    position: absolute;
    top: -1;
    left: 0;
    right: 0;
    width: 3rem;
}

.action-draggable-chip{
    display: block;
    width: 60px;
    height: 6px;
    background: rgb(130,130,130);
}

</style>