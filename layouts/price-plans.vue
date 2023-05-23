<template>
    <v-app id="scroll-target">
        <v-app-bar
            class="app-bar"
            density="comfortable"
            fixed
            flat
            floating
        >
            <AppLayoutsLogo />
        </v-app-bar>
        <v-main>
            <v-container class="pa-0" fluid>
                <slot></slot>
            </v-container>
        </v-main>
        <MobileMenu />
        <AppLayoutsFooter />
    </v-app>
</template>
    
<script lang="ts" setup>

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
</style>