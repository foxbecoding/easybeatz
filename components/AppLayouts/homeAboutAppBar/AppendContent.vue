<template> 
    <div>
        <div v-if="$vuetify.display.mdAndUp" :class="$vuetify.display.mdAndUp ? 'pr-6' : ''">
            <div v-if="!userStore.is_authenticated">
                <v-btn to="/auth/sign-in">
                    <v-icon class="mr-2">mdi-account-circle-outline</v-icon>
                    Sign in
                </v-btn>
                <v-btn 
                    to="/auth/sign-up" 
                    color="primary"
                    class="text-background" 
                    variant="elevated"
                    rounded="xl"
                >
                    Sign up free!
                </v-btn> 
            </div>
            <div v-else>
                <v-btn to="/account">
                    <v-icon class="mr-2">mdi-account-circle-outline</v-icon>
                    My account
                </v-btn>
            </div>             
        </div> 
        <div v-else>
            <v-btn  to="/beats">
                <v-icon class="mr-2">mdi-music-circle-outline</v-icon>
                Beats
            </v-btn>
        </div>  
    </div>
</template>
    
<script lang="ts" setup>
import { useUser } from '@/store/User'

const userStore = useUser()
const pageYOffset = ref<number>(0)
const APP_BG_COLOR = computed(() => {
    if(pageYOffset.value <= 40 ){
        return 'app-bar-transparent'
    }
    return 'app-bar'
})

const onScroll = (e: any): void => {
    pageYOffset.value = window.pageYOffset
}
</script>
<style scoped>
.app-bar-transparent {
    background: transparent !important;
}
.app-bar {
    background: rgba(15,15,15,0.1)  !important;
}
.app-bar:before{
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
</style>