import { useSliderStore } from '@/store/Slider'

export const useSlider = (key: string) => {
    interface SliderAction {
        id: number
        direction: 'left'|'right'
        icon: string
    }
    
    const route = useRoute()
    const slider = ref()
    const sliderActions = ref<SliderAction[]>([
        {id: 1, direction: 'left', icon: 'mdi-chevron-left'},
        {id: 2, direction: 'right', icon: 'mdi-chevron-right'},
    ])
    const timerId = ref()

    const saveScrollLeft = (): void => {
        useSliderStore().scrollLeft[`${key}`] = slider.value.$el.scrollLeft 
    }

    const sliderHandler = (direction: 'left'|'right'): void => {
        const scroll: number = 80 
        if(direction === 'left'){
            slider.value.$el.scrollLeft -= scroll
            saveScrollLeft()
            return
        }
        slider.value.$el.scrollLeft += scroll
        saveScrollLeft()
        return
    }
    
    const sliderHandlerHold = (direction: 'left'|'right'): void => {
        const scroll: number = 80 
        const duration: number = 100
        timerId.value = setInterval(() => {
            if(direction === 'left'){
                slider.value.$el.scrollLeft -= scroll
                saveScrollLeft()
                return
            }
            slider.value.$el.scrollLeft += scroll
            saveScrollLeft()
            return
        }, duration)
    }
    
    const clearSliderHandlerHold = (): void => {
        timerId.value && clearInterval(timerId.value)
    }
    
    const SCROLL_POS = computed(() => {
        return useSliderStore().scrollLeft[`${key}`]
    })

    return { 
        slider,
        sliderActions,
        timerId,
        sliderHandler,
        sliderHandlerHold,
        saveScrollLeft,
        clearSliderHandlerHold,
        SCROLL_POS
    }
}