<template>
    <div>
        <v-app-bar-nav-icon 
            v-if="SHOW" 
            @click.stop="clickHandler()" 
            flat
            :icon="$route.name != 'menu'?  'mdi-menu' : 'mdi-arrow-left'"
            class="ml-1 bg-transparent"
        />
    </div>
</template>
    
<script lang="ts" setup>
import { useLayoutsStore } from '@/store/Layouts';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const layoutsStore = useLayoutsStore()
const vDisplay = useDisplay() 
const route = useRoute()
const router = useRouter()

const SHOW = computed(() => {
    if(vDisplay.mdAndUp.value) return true;
    else if((vDisplay.smAndDown.value && route.name === 'index') 
    || (vDisplay.smAndDown.value && route.name === 'about')
    || (vDisplay.smAndDown.value && route.name === 'menu')){
        return true
    }
    return false
})

const clickHandler = (): void => {
    if(!vDisplay.smAndDown.value){
        layoutsStore.isRail = !layoutsStore.isRail
        return
    }
    if(route.name === 'menu'){
        router.back()
        return
    }
    router.push('/menu')
    // layoutsStore.isMobileMenu = !layoutsStore.isMobileMenu
}
</script>
<style scoped>
.app-bar-transparent-btn {
    background: transparent !important;
}
.app-bar-solid-btn {
    background: #030303 !important;
}
</style>