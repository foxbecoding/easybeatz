<template>
    <div>
        <ActionSheet 
            v-if="$vuetify.display.smAndDown"
            v-model="layoutsStore.isMobileMenu" 
            fullscreen
            isCloseBtn
            title="Menu"
            :maxHeight="100"
            :start-height="100"
            isScrim
            scrim="#282828"
            rounded="xl"
        >
            <v-list 
                bg-color="surface" 
                style="touch-action: none;"
                class="px-0" 
            >
                <v-divider inset/>
                <div v-for="(item, i) in navListItems" :key="i">
                    <v-list-item
                        :active="false"
                        :prepend-icon="item.icon" 
                        :title="item.title" 
                        :to="item.to"
                        @click="layoutsStore.isMobileMenu = !layoutsStore.isMobileMenu"
                        rounded="none"
                        color="primary" 
                        style="margin-bottom: 0 !important;"
                    >
                    </v-list-item>
                    <v-divider inset />
                </div>         
            </v-list>
            <v-container style="line-height: 1.2rem">
                <AppLayoutsMainNavFooter class="text-center"/>
            </v-container>
        </ActionSheet>
    </div> 
</template>
<script lang="ts" setup>
import LinkList from '@/utils/types/LinkList'
import { useLayoutsStore } from '@/store/Layouts';

const layoutsStore = useLayoutsStore()

const navListItems = ref<LinkList[]>([
    {
        icon: 'mdi-music-circle-outline',
        title: 'Beats',
        route_name: 'beats',
        to: '/beats'
    },
    {
        icon: 'mdi-account-circle-outline',
        title: 'My account',
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
        icon: 'mdi-information-outline',
        title: 'Pricing',
        route_name: 'pricing',
        to: '/pricing'
    },
    // {
    //     icon: 'mdi-television-guide',
    //     title: 'How it works',
    //     route_name: 'how-it-works',
    //     to: '/how-it-works'
    // },
    // {
    //     icon: 'mdi-post-outline',
    //     title: 'Blog',
    //     route_name: 'blog',
    //     to: '/blog'
    // },
    {
        icon: 'mdi-frequently-asked-questions',
        title: 'FAQ',
        route_name: 'faq',
        to: '/faq'
    },
    {
        icon: 'mdi-information-outline',
        title: 'About us',
        route_name: 'about',
        to: '/about'
    },
    {
        icon: 'mdi-email-fast',
        title: 'Contact us',
        route_name: 'contact',
        to: '/contact'
    },
    {
        icon: 'mdi-file-document-outline',
        title: 'Terms of agreement',
        route_name: 'terms',
        to: '/terms'
    },
    {
        icon: 'mdi-lock-outline',
        title: 'Privacy Policy',
        route_name: 'privacy',
        to: '/privacy'
    }
])
</script>