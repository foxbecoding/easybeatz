<template>
    <v-navigation-drawer
        v-if="$vuetify.display.mdAndUp"
        :floating="true"
        color="background"
        fixed
        permanent
        location="right"
    >
        <AppLayoutsToolbar class="sticky-content"/>
        <PlayingBeatData v-if="$route.name == 'playing-slug'"  />
        <TokenData class="ma-2" v-if="SHOW_TOKEN_DATA" />
    </v-navigation-drawer>
</template>

<script lang="ts" setup>

const route = useRoute()
const SHOW_TOKEN_DATA = computed<boolean>(() => {
    let exclude_routes: string[] = [
        // 'auth-sign-in', 
        // 'auth-sign-up',
        // 'auth-forgot-password',
        'terms',
        'privacy',
        'playing-slug'
    ]
    if(exclude_routes.includes(route.name as string)) return  false
    return true
})

</script>

<style scoped>
.sticky-content{
    position: sticky !important;
    top: 0px !important;
    z-index: 2;
}
</style>