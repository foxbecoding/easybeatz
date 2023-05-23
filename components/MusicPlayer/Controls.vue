<template>
    
        <v-btn
            v-for="btn in musicControlBtns"
            :variant="btn.name === 'play_pause' ? 'flat' : 'text'"
            :color="btn.name === 'play_pause' ? 'primary text-surface' : btn.color"
            icon
            @click.stop="btn.clickHandler"
        >
            <v-icon>
                {{ btn.icon }}
            </v-icon>
            <v-tooltip
                v-if="$vuetify.display.mdAndUp"
                :activator="btn.tooltipActivator"
                :text="btn.tooltipText"
                location="top" 
            />
        </v-btn> 
    
</template>
<script lang="ts" setup>
const {
    musicControlBtns, 
    musicPlayerStore, 
    setPlayPauseBtnData, 
    setShuffleBtnData, 
    setLoopBtnData
} = useMusicControls()

watch(musicPlayerStore, () => {
    setPlayPauseBtnData()
    setLoopBtnData()
    setShuffleBtnData()
})
</script>

<style scoped>

</style>

