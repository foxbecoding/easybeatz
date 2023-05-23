<template>
    <div>
        <hr class="custom-divider v-divider v-theme--darkTheme" aria-orientation="horizontal" role="separator" />
        <DynamicScroller
            :items="BEATZ"
            :min-item-size="49"
            :pageMode="true"
            :buffer="400"
            class="scroller"
            key-field="pk"
        >
            <template v-slot="{ item, index, active }">
                <DynamicScrollerItem
                    :item="item"
                    :active="active"
                    :data-index="index+1"
                >
                    <div
                        :id="index"
                        @click="selectBeat(item, index)" 
                        v-ripple 
                        class="v-list-item v-list-item--density-default v-list-item--variant-text"
                    >
                        <span class="v-list-item__overlay"></span>
                        <div class="v-list-item__content">
                            <div class="v-list-item-title">{{item.beat_title}}</div>
                            <div class="v-list-item-subtitle">{{item.user.og_username}}</div>
                        </div>
                        <div class="v-list-item__append">
                            <div v-if="$vuetify.display.mdAndUp">
                                <EasyLoader 
                                    v-if="item.pk === musicPlayerStore.beat.pk && !musicPlayerStore.isPaused" 
                                    style="width: 30px"
                                />
                                <img 
                                    v-if="item.pk === musicPlayerStore.beat.pk && musicPlayerStore.isPaused" 
                                    src="/logo-icon.png" 
                                    width="30"
                                    style="top: 3px; position: relative;"
                                />
                            </div>
                            <div v-else>
                                <img 
                                    v-if="item.pk === musicPlayerStore.beat.pk" 
                                    src="/logo-icon.png" 
                                    width="30"
                                    style="top: 3px; position: relative;"
                                />
                            </div>
                            <button 
                                v-for="(btn, i) in actions"
                                @click.stop="actionHandler(btn.id, item)"
                                :key="btn.id"
                                :class="btn.id == 2 && item.is_favorite ?  `text-error`: `text-${btn.color}`" 
                                class="v-btn v-btn--icon v-theme--darkTheme v-btn--density-default v-btn--size-small v-btn--variant-text" 
                                type="button"
                                style="z-index: 10;"
                                v-ripple
                            >
                                <span class="v-btn__overlay"></span>
                                <span class="v-btn__underlay"></span>
                                <span class="v-btn__content">
                                    <i 
                                        :class="setButtonIcon(btn, item)"
                                        class="mdi v-icon notranslate v-theme--darkTheme v-icon--size-x-large" 
                                        aria-hidden="true">
                                    </i>
                                </span>
                                <v-tooltip
                                    v-if="$vuetify.display.mdAndUp"
                                    :activator="btn.tooltipActivator"
                                    :text="setTooltip(btn, item)"
                                    location="top" 
                                />
                            </button>
                        </div>
                    </div>
                    <hr class="custom-divider v-divider v-theme--darkTheme" aria-orientation="horizontal" role="separator" />
                </DynamicScrollerItem>
            </template>
        </DynamicScroller>
    </div>
</template>
    
<script lang="ts" setup>
import { Beat } from '@/utils/types/Beats'
import { PropType } from 'vue'
import { useMusicPlayer } from '@/store/MusicPlayer'
import { useUser } from '@/store/User'

const props = defineProps({
    beats: {
        type: Array as PropType<Beat[]>,
        required: true
    },
    all_beats: {
        type: Array as PropType<Beat[]>,
        required: false
    }
})

const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()
const { 
        actions,
        setButtonIcon,
        setTooltip,
        actionHandler,
    } = useBeatMethods()
const musicPlayerStore = useMusicPlayer()
const userStore = useUser()

const BEATZ = computed<Beat[]>(() => props.beats )

const ALL_BEATZ = computed<Beat[]>(() => props.all_beats ? props.all_beats : [])

//methods
const selectBeat = (beat: Beat, index: number): void => {
    if(route.name === 'index'){
        router.push('/beats')
    }
    let beat_file: string = `/media/${beat.beat_file}`
    let is_purchased: boolean = beat.is_purchased && userStore.is_authenticated
    if(is_purchased){
        const USER_BEATS_LIBRARY = config.public.USER_BEATS_LIBRARY
        const USER_LIBRARY = userStore.user.pk_alt+'-library/'
        beat_file = USER_BEATS_LIBRARY+USER_LIBRARY+beat.beat_file.replace('beats/', '')
    }
    let queue: Beat[] = BEATZ.value 
    if(props.all_beats && ALL_BEATZ.value.length > 0){
        queue = ALL_BEATZ.value
    }else if(route.name != 'index'){
        queue = BEATZ.value
    }
    
    if(route.name === 'playing-slug'){
        musicPlayerStore.isPlayingPage = true
    }else{
        musicPlayerStore.isPlayingPage = false
    }  

    musicPlayerStore.setBeatsQueue(beat, BEATZ.value, queue, index, is_purchased)
    musicPlayerStore.setAudio(beat_file)
    musicPlayerStore.isActive = true
    musicPlayerStore.play_pause()
}

</script>
<style scoped>
.scroller {
    height: 100%;
}

.v-list-item:hover {
    cursor: pointer;    
}
</style>