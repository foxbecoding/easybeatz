<template>
    <div>  
        <div 
            v-if="props.modelValue && props.isScrim"
            @click="props.isCloseOnScrim ? close() : ''" 
            class="overlay" 
        ></div>
        <v-card 
            @touchstart="onDragStart" 
            @touchend="onDragEnd"
            v-model="props.modelValue"
            id="sheet"
            color="surface"
            class="action-sheet"
            :class="CLASSES"
            :rounded="`t-${props.rounded}`"
            :style="{
                maxHeight: `${props.maxHeight}%`,
                height: `${sheetHeight}vh`
            }"
        >
            <v-toolbar color="surface">
                <div class="action-draggable-area py-4 mx-auto">
                    <div 
                        v-if="props.actionChip" 
                        id="FOX"
                        
                        class="rounded-pill action-draggable-chip"
                    ></div>
                </div>
                <v-btn 
                    v-if="props.isCloseBtn"
                    @click="close()"
                    class="action-close-btn" 
                    variant="plain" 
                    icon
                >
                    <v-icon size="large">
                        mdi-close-circle
                    </v-icon>
                </v-btn>
            </v-toolbar>
            <slot name="topContent"></slot>
            <v-card-title v-if="props.title">{{ props.title }}</v-card-title>
            <v-card-text class="pa-0 action-content">
                <slot></slot>
            </v-card-text>
        </v-card>
    </div>  
</template>

<script lang="ts" setup>

const props = defineProps({
    isScrim: Boolean,
    scrim: String,
    rounded: {
        type: String||Boolean||Number,
        default: 'sm'
    },
    startHeight: {
        type: Number,
        default: 50
    },
    maxHeight: {
        type: Number,
        default: 100
    },
    modelValue: {
        type: Boolean,
        required: true,
        default: false
    },
    actionChip: {
        type: Boolean,
        default: true
    },
    isCloseBtn: Boolean,
    isCloseOnScrim: {
        type: Boolean,
        default: true
    },
    title: String
})

const dragPosition = ref<any>()
const sheetHeight = ref<any>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

watch(() => props.modelValue, (newValue, oldValue) => {
    if(newValue) setSheetHeight(Math.min(props.startHeight, window.innerHeight / window.innerHeight * 100))
})

onMounted(() => {
    setTimeout(() => {
        window.addEventListener("touchmove", onDragMove)
        window.addEventListener("touchend", onDragEnd)
    }, 1000)    
})

const CLASSES = computed(() => ({
    'action-sheet--open':  props.modelValue, 
    'action-sheet--close':  !props.modelValue, 
}))

const setSheetHeight = (value: any) => {
    let height = Math.max(0, Math.min(100, value))
    sheetHeight.value = height
}

const touchPosition = (event: any) => {
    return event.touches ? event.touches[0] : event
}

const onDragStart = (event: any) => dragPosition.value = touchPosition(event).pageY

const onDragMove = (event: any) => {
    if (dragPosition.value === undefined) return
    const y = touchPosition(event).pageY
    const deltaY = dragPosition.value - y
    const deltaHeight = deltaY / window.innerHeight * 100
    setSheetHeight(sheetHeight.value + deltaHeight)
    dragPosition.value = y
}
const onDragEnd = () => {
  dragPosition.value = undefined
  if (sheetHeight.value < 25) {
    emit('update:modelValue', false)
  } else if (sheetHeight.value > 75) {
    setSheetHeight(100)
  } else {
    setSheetHeight(50)
  }
}

const close = () => {
    emit('update:modelValue', false)
    dragPosition.value = undefined
}
</script>

<style scoped>
.action-sheet {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2023;
    width: 100%;
    touch-action: none;
}

.action-content{
    touch-action: none;
}

.action-draggable-area {
    position: absolute;
    top: 0;
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

.action-close-btn{
    position: absolute;
    top: 0px;
    right: 0;
}

.action-sheet--open {
    transition: all .3s ease-out;
    -webkit-transition: all .3s ease-out;
    -moz-transition: all .3s ease-out;
    -o-transition: all .3s ease-out;
    -ms-transition: all .3s ease-out;
    transform: translateY(0%);
}

.action-sheet--close {
    transition: all .1s ease-out;
    -webkit-transition: all .1s ease-out;
    -moz-transition: all .1s ease-out;
    -o-transition: all .1s ease-out;
    -ms-transition: all .1s ease-out;
    transform: translateY(100%);
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2010;
    background: #000;
    opacity: 0.5;
}

</style>