import { useNativeScroll } from '@/store/NativeScroll'

function scrollToPosY(posY){
  setTimeout(()=>{
      window.scrollTo({
        top: posY,
        left: 0,
        behavior: 'instant'
      })    
  },10)
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$router.options.scrollBehavior = (to, from, savedPosition) => {
    const nativeScrollStore = useNativeScroll()
    if(to.name === 'beats'){
      scrollToPosY(nativeScrollStore.scrollTop.beats)
      return { top: nativeScrollStore.scrollTop.beats }
    }else if(to.name === 'playing-slug'){
      scrollToPosY(nativeScrollStore.scrollTop.playing)
      return { top: nativeScrollStore.scrollTop.playing }
    }else if(savedPosition){
      return { top: savedPosition }
    }else{
      return { top: 0 }
    }
  }
})