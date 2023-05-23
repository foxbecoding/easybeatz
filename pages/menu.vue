<template>
    <div>
        <v-container
            class="py-0" 
            :class="$vuetify.display.mdAndUp ? 'px-4' : 'px-0'"
            fluid
        >
            <h1 :class="$vuetify.display.mdAndUp ? 'mx-0' : 'mx-4'">Menu</h1>
            <v-list  bg-color="background" class="px-0" nav>
                <v-divider inset/>
                <div v-for="(item, i) in navListItems" :key="i">
                    <v-list-item
                        :prepend-icon="item.icon" 
                        :title="item.title" 
                        :to="item.to"
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
        </v-container>
    </div> 
</template>
<script lang="ts" setup>
import LinkList from '@/utils/types/LinkList'

const navListItems = ref<LinkList[]>([
    {
        icon: 'mdi-home',
        title: 'Home',
        route_name: 'index',
        to: '/'
    },
    {
        icon: 'mdi-music-circle-outline',
        title: 'Beats',
        route_name: 'beats',
        to: '/beats'
    },
    {
        icon: 'mdi-music-box-multiple-outline',
        title: 'Genres',
        route_name: 'genres',
        to: '/genres'
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

const { seo } = useSEO('Menu', 'mobile menu')

useHead(seo)
</script>