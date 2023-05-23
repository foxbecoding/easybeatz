<template>
    <v-app id="scroll-target">
        <AppLayoutsMainNav />
        <AppLayoutsSideNav />
        <v-app-bar
            class="app-bar"
            density="comfortable"
            fixed
            flat
            floating
        >
            <AppLayoutsMainNavBtn v-if="$vuetify.display.smAndDown"/>
            <AppLayoutsLogo v-if="$vuetify.display.smAndDown && $route.name != 'menu'" />

            <SearchBarDesktop class="mx-auto" v-if="SHOW_DESKTOP_SEARCH"/>
            <SearchBarMobile v-if="SHOW_MOBILE_SEARCH"/>

            <template v-if="$vuetify.display.smAndDown" v-slot:append>
                <AppLayoutsToolbar />
            </template>
        </v-app-bar>

        <v-main>
            <v-container 
                class="pa-0" 
                :style="{  marginBottom: `${MOBILE_LAYOUT_ADJUST}px` }" 
                fluid
            >
                <slot></slot>
            </v-container>
        </v-main>

        <Snackbar />
        <MusicPlayer v-if="$route.name != 'menu'"/>
        <TokenDataMenu />
        <MobileBottomNav v-if="$vuetify.display.smAndDown"/>
        <BeatsBeatOptions v-if="$vuetify.display.mdAndUp"/>
        <BeatsMobileBeatOptions v-else/>
        <BeatsDownloadBeat />
    </v-app>
</template>
    
<script lang="ts" setup>
import { useDisplay } from 'vuetify'
import { useLayoutsStore } from '@/store/Layouts'
import { useMusicPlayer } from '@/store/MusicPlayer'

const route = useRoute()
const vDisplay = useDisplay()
const layoutStore = useLayoutsStore()
const musicPlayerStore = useMusicPlayer()

const MOBILE_LAYOUT_ADJUST = computed<number>((): number => {
    if(musicPlayerStore.isActive && vDisplay.smAndDown.value){
        return layoutStore.mobileAdjust
    }
    return 0
})

const SHOW_DESKTOP_SEARCH = computed<boolean>(
    (): boolean => {
        let auth_paths: string[]  = [
            'auth-sign-in', 
            'auth-sign-up', 
            'auth-forgot-password',
            'terms',
            'privacy'
        ]
        return vDisplay.mdAndUp.value && !auth_paths.includes(route.name as string) ? true : false
    } 
)

const SHOW_MOBILE_SEARCH = computed<boolean>(
    (): boolean => {
        let auth_paths: string[]  = [
            'auth-sign-in', 
            'auth-sign-up', 
            'auth-forgot-password',
            'terms',
            'privacy'
        ]
        return vDisplay.smAndDown.value && !auth_paths.includes(route.name as string) ? true : false
    }
)


</script>
<style scoped>
.app-bar {
    background: rgba(15,15,15,0.1)  !important;
}
.app-bar::before{
    content: "";
    background: inherit;
    position: absolute;
    width : 100%;
    height: 100%;
    z-index: -1;
    -webkit-backdrop-filter: blur(3px);
    -moz-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
}

.fade-in {
  animation: fadeIn 1s;
  -webkit-animation: fadeIn 1s;
  -moz-animation: fadeIn 1s;
  -o-animation: fadeIn 1s;
  -ms-animation: fadeIn 1s;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@-moz-keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@-webkit-keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@-o-keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@-ms-keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
</style>