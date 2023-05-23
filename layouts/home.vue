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
            <v-container class="pa-0" fluid>
                <slot></slot>
            </v-container>
        </v-main>
        <BeatsBeatOptions v-if="$vuetify.display.mdAndUp"/>
        <BeatsMobileBeatOptions v-else/>
        <AppLayoutsFooter />
    </v-app>
</template>
    
<script lang="ts" setup>

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



</script>
<style scoped>
.app-bar-transparent {
    background: transparent !important;
}
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
</style>