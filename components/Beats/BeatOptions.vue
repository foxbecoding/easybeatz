<template>
    <div>
        <v-menu 
            v-model="beatMenuStore.isOptionMenu"
            width="250" 
            location="top right"
            location-strategy="connected"
            transition="scale-transition"
            style="position: fixed !important; top: 15px; left: calc(100% - 265px) !important;"
        >
            <v-list min-width="250"  density="compact" class="options-menu">
                <p class="pa-4">{{beatMenuStore.optionMenuBeat.beat_title}}</p>
                <v-divider />
                <div v-for="(option, i) in beatOptions" :key="i">
                    <v-list-item
                        density="compact"
                        :append-icon="option.icon"
                        @click="beatOptionHandler(option.name, beatMenuStore.optionMenuBeat)"
                    >
                        <v-list-item-title>{{ option.label }}</v-list-item-title>
                    </v-list-item>
                    <v-divider />
                </div>
                <v-container v-if="beatMenuStore.optionMenuBeat" class="py-1">
                    <small>Details</small>
                    <p>Genre: {{ beatMenuStore.optionMenuBeat.genre.og_genre }}</p> 
                    <p>Type beat: {{ beatMenuStore.optionMenuBeat.beat_seo }}</p> 
                    <p>Producer: {{ beatMenuStore.optionMenuBeat.user.og_username }}</p>
                    <p>Duration: {{ beatMenuStore.optionMenuBeat.beat_duration }}</p>
                </v-container>
            </v-list>       
        </v-menu>
    </div>
</template>
    
<script lang="ts" setup>
import { useBeatMenu } from '@/store/Beats'

const beatMenuStore = useBeatMenu()
const {beatOptions, beatOptionHandler} = useBeatOptions()

</script>
<style scoped>
.options-menu {
    background: rgba(18,18,18,0.75)  !important;
    overflow-y: hidden !important;
}
.options-menu:before{
    content: "";
    overflow-y: hidden !important;
    background: inherit;
    position: absolute;
    width : 100%;
    height: 100%;
    z-index: -1;
    -webkit-backdrop-filter: blur(3px);
    -moz-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
}
</style>