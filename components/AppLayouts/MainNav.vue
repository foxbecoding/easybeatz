<template>
    <v-navigation-drawer
        v-if="$vuetify.display.mdAndUp"
        :rail="layoutsStore.isRail"
        :floating="true"
        color="background"
        fixed
        permanent
        v-model="drawer"
    >
        <div class="d-flex">
            <AppLayoutsMainNavBtn />
            <AppLayoutsLogo  class="ma-2"/>
        </div>
        <v-list nav>
            <v-list-item
                v-for="(item, i) in navListItems"
                :key="i"
                :prepend-icon="setPrependIcon(item)" 
                :title="item.title" 
                :to="item.to"
                color="primary"
                :rounded="!layoutsStore.isRail ? 'xl' : 'lg'"              
                router
            >
                <template v-if="item.route_name == 'token-shop'" v-slot:prepend>
                    <v-icon :color="item.route_name == $route.name ? 'warning' : ''">mdi-poker-chip</v-icon>
                </template>
            </v-list-item>
        </v-list>
        <v-container v-if="!layoutsStore.isRail" style="line-height: 1.2rem">
            <AppLayoutsMainNavFooter />
        </v-container>
    </v-navigation-drawer>
</template>
    
<script lang="ts" setup>
import LinkList from '@/utils/types/LinkList'
import { useLayoutsStore } from '@/store/Layouts';

const route = useRoute()
const layoutsStore = useLayoutsStore()
const drawer = ref<boolean>(true)
const navListItems = ref<LinkList[]>([
    {
        icon: 'mdi-home',
        title: 'Home',
        route_name: 'index',
        to: '/'
    },
    {
        icon: 'mdi-music-circle',
        title: 'Beats',
        route_name: 'beats',
        to: '/beats'
    },
    {
        icon: 'mdi-music-box-multiple',
        title: 'Genres',
        route_name: 'genres',
        to: '/genres'
    },
    {
        icon: 'mdi-account-circle',
        title: 'Account',
        route_name: 'account',
        to: '/account'
    },
    {
        icon: 'mdi-poker-chip',
        title: 'Token Shop',
        route_name: 'token-shop',
        to: '/token-shop'
    },
    {
        icon: 'mdi-information',
        title: 'Pricing',
        route_name: 'pricing',
        to: '/pricing'
    }
])

//methods
const setPrependIcon = (item: LinkList): any => {
    if(item.route_name === 'token-shop'){ return; }
    return item.route_name === route.name ? item.icon : `${item.icon}-outline`
}

</script>
<style scoped>
.aux-links {
    text-decoration: none;
    font-size: 0.8rem;
    opacity: 0.8;
}
.aux-links:hover {
    opacity: 0.65;
}

.legal-content {
    font-size: 0.8rem;
    opacity: 0.8;
}
</style>