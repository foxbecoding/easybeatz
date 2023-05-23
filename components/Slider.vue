<template>
    <div>
        <div class="d-flex">
            <BeatsListTitle 
                v-if="props.title"
                :class="BEAT_TITLE_CLASS"
            >
                {{ props.title }}
            </BeatsListTitle>
            <slot v-else name="title" />
            <v-spacer />
            <div v-if="$vuetify.display.mdAndUp">
                <v-btn 
                    v-for="(action, i) in sliderActions"
                    :key="action.id"
                    @click="sliderHandler(action.direction)"
                    @mousedown="sliderHandlerHold(action.direction)"
                    @mouseup="clearSliderHandlerHold()"
                    color="transparent" 
                    flat 
                    icon
                    size="small"
                >
                    <v-icon size="large">{{ action.icon }}</v-icon>
                </v-btn>
            </div>
        </div>
        <v-container 
            ref="slider"
            class="py-0 ma-0 slider"
            :class="BEAT_TITLE_CLASS" 
            style="overflow-x: scroll;"
            fluid 
        >
            <div class="d-flex">
                <slot />
            </div>
        </v-container>
    </div>
    
</template>

<script lang="ts" setup>
import { useSliderStore } from '@/store/Slider'
import { useDisplay } from 'vuetify';

const props = defineProps({
    scrollKey: {
        required: true,
        type: String
    },
    title: String
})

const route = useRoute()
const vDisplay = useDisplay()
const { 
        slider,
        sliderActions, 
        SCROLL_POS,
        saveScrollLeft,
        sliderHandler,
        sliderHandlerHold,
        clearSliderHandlerHold
    } = useSlider(`${props.scrollKey}`)


const sliding = (e: Event): void => {
    if(slider.value){
        saveScrollLeft()
    }
}

const BEAT_TITLE_CLASS = computed(() => {
    if(vDisplay.smAndDown.value || route.name === 'playlists-slug'){ return 'px-4' }
    return 'px-0'
})

onMounted(() => {
    slider.value.$el.scrollLeft = SCROLL_POS.value
    setTimeout(() => {
        window.addEventListener("touchend", sliding)
    }, 1000)    
})
</script>

<style scoped>
.slider::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.slider {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}</style>