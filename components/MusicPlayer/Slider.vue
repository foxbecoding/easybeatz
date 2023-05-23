<template>
    <div>
        <div class="d-flex">
            <div class="beat-time">
                {{musicPlayerStore.CURRENT_TIME_STR}}
            </div>
            <div class="mx-1 music-player-slider--container">
                <input 
                    @click.stop 
                    @mousedown="mouseDown"
                    @mouseup="mouseUp"
                    @touchstart="mouseDown"
                    @touchend="mouseUp"
                    @change="valueChange"
                    @input="inputChange"
                    type="range" 
                    :min="0" 
                    :max="musicPlayerStore.duration" 
                    :style="SLIDER_BACKGROUND_SIZE"
                    v-model="CURRENT_TIME"
                    class="music-player-slider" 
                    ref="slider"
                    id="myRange"
                />
            </div>
            <div class="beat-time"> 
                {{musicPlayerStore.durationStr}}
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useMusicPlayer } from '@/store/MusicPlayer'

const musicPlayerStore = useMusicPlayer()

const CURRENT_TIME = computed(() => {
    return musicPlayerStore.currentTime
})

const SLIDER_BACKGROUND_SIZE = computed(() => {
    const min: number = 0
    const max: number = musicPlayerStore.duration
    const val: number = musicPlayerStore.currentTime >= 4 ? musicPlayerStore.currentTime : 4
    return `background-size: ${(val - min) * 100 / (max - min)}% 100%` 
})

const mouseDown = (): void => {
    musicPlayerStore.isSliding = true
    musicPlayerStore.timeInterval && clearInterval(musicPlayerStore.timeInterval)
}

const mouseUp = (): void => {
    musicPlayerStore.isSliding = false
    musicPlayerStore.audioTimeUpdateEvents()
}

const inputChange = (e: any): void => {
    musicPlayerStore.currentTime = e.target.valueAsNumber
}

const valueChange = (e: any): void => {
    musicPlayerStore.audio.currentTime = e.target.valueAsNumber
}
</script>

<style lang="scss" scoped>
$primary:#3fabf3;
.music-player-slider--container {
    position: relative;
    width: 100%;
    max-width: 500px;
    top: -5px;
    height: 18px;
}

@media screen and (max-width: 959px) {
  .music-player-slider--container{
    top: -1px
  }
}

.music-player-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 7px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 5px;
    background-image: linear-gradient($primary, $primary);
    background-size: 4% 100%;
    background-repeat: no-repeat;
}

/* Input Thumb */
.music-player-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background: $primary;
  cursor: ew-resize;
  box-shadow: 0 0 2px 0 #555;
  transition: background .3s ease-in-out;
}

.music-player-slider::-moz-range-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background: $primary;
  cursor: ew-resize;
  box-shadow: 0 0 2px 0 #555;
  transition: background .3s ease-in-out;
}

.music-player-slider::-ms-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background: $primary;
  cursor: ew-resize;
  box-shadow: 0 0 2px 0 #555;
  transition: background .3s ease-in-out;
}

.music-player-slider::-webkit-slider-thumb:hover {
    cursor: pointer;
}

.music-player-slider::-moz-range-thumb:hover {
    cursor: pointer;
}

.music-player-slider::-ms-thumb:hover {
    cursor: pointer;
}

/* Input Track */
.music-player-slider::-webkit-slider-runnable-track  {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}

.music-player-slider::-moz-range-track {
  -webkit-appearance: none;
  appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}

.music-player-slider::-ms-track {
  -webkit-appearance: none;
  appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}

.music-player-slider--mini {
    position: fixed;
    width: 100%;
    bottom: 68px;
    left: 0;
}
.beat-time{
    font-size: 0.75rem
}
</style>

