<template>
    <v-app>
        <v-app-bar
            :class="APP_BG_COLOR"
            density="comfortable"
            :fixed="false"
            flat
            floating
        >
            <AppLayoutsMainNavBtn v-if="$vuetify.display.smAndDown"/>
            <AppLayoutsLogo :class="$vuetify.display.mdAndUp ? 'pl-4' : ''" />
            <v-spacer v-if="$vuetify.display.mdAndUp"/>
            <AppLayoutsHomeAboutAppBarMainContent />
            <v-spacer v-if="$vuetify.display.mdAndUp"/>
            <template  v-slot:append>
                <AppLayoutsHomeAboutAppBarAppendContent />  
            </template>
        </v-app-bar>
        <v-main v-scroll="onScroll">
            <v-container class="my-8" fluid>
                <div class="easy-glow"></div>
                <div class="d-flex flex-column text-center">
                    <h1>{{ props.error?.statusCode }} {{ props.error?.message }}</h1>
                    <h1></h1>
                    Oops! There was an error 😱
                </div>
                <div class="my-4 text-center">
                    <v-btn 
                        @click="$router.push('/')"
                        class="rounded-xl text-background mr-4" 
                        color="primary"
                        variant="flat"
                    >
                        <v-icon>mdi-home</v-icon>
                        Home
                    </v-btn>
                    <v-btn 
                        @click="$router.push('/beats')"
                        class="rounded-xl text-background" 
                        color="primary"
                        variant="flat"
                    >   
                        <v-icon>mdi-music</v-icon>
                        Beats
                    </v-btn>
                </div>
            </v-container>
        </v-main>
        <AppLayoutsFooter />
    </v-app>
</template>
  
<script lang="ts" setup>
const props = defineProps({
    error: Object
})
const pageYOffset = ref<number>(0)
const APP_BG_COLOR = computed(() => {
    if(pageYOffset.value <= 40 ){
        return 'app-bar-transparent'
    }
    return 'app-bar'
})

// Methods
const onScroll = (e: any): void => {
    pageYOffset.value = window.pageYOffset
}
const handleError = () => clearError({ redirect: '/' })
const { seo } = useSEO('Error', 'Error on page')
useHead(seo)

</script>
<style scoped>
.easy-glow {
    background: repeating-linear-gradient(to right, #3fabf3 0%, #03A9F4 50%, #00BCD4 100%);
    opacity: 0.5;
    height: 300px;
    width: 300px;
    filter: blur(140px);
    position: absolute;
    right: 0;
    top: -150px;
    -webkit-backface-visibility: hidden;
    -webkit-perspective: 1000;
    -webkit-transform: translate3d(0,0,0);
    -webkit-transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000;
    transform: translate3d(0,0,0);
    transform: translateZ(0);
}

@media screen and (max-width: 959px) {
  .easy-glow{
    top: -200px
  }
}

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