<template>
    <div>
        <v-bottom-navigation
            class="pb-3 bottom-nav"
            bg-color="surface"
            color="primary"
            grow
            height="70"
        >
            <v-btn 
                v-for="item in navListItems" 
                :ripple="false"
                :to="item.to"
                :rel="item.route_name == 'menu' ? 'nofollow' : ''"
                :value="item.route_name"
                variant="plain"
            >
                <v-badge
                    v-if="item.route_name == 'cart'"
                    color="warning"
                    :content="cartStore.cart.length"
                    :dot="cartStore.cart.length == 0 ? true : false"
                >
                    <v-icon>{{item.icon}}</v-icon>
                </v-badge>
                <v-icon v-else>{{item.icon}}</v-icon>
                {{item.title}}
            </v-btn>
        </v-bottom-navigation>
    </div>
</template>
<script lang="ts" setup>
import LinkList from '@/utils/types/LinkList';
import { useCart } from '@/store/Cart';

const cartStore = useCart()

const navListItems = ref<LinkList[]>([
    {
        icon: 'mdi-music-circle',
        title: 'Beats',
        route_name: 'beats',
        to: '/beats'
    },
    {
        icon: 'mdi-account-circle',
        title: 'Account',
        route_name: 'account',
        to: '/auth/sign-in'
    },
    {
        icon: 'mdi-cart',
        title: 'Cart',
        route_name: 'cart',
        to: '/cart'
    },
    {
        icon: 'mdi-menu',
        title: 'Menu',
        route_name: 'menu',
        to: '/menu'
    }
])
</script>
<style scoped>
.bottom-nav {
    border-style: solid;
    border-color: rgba(255,255,255, 0.12);
    border-width: thin 0 0 0;
}
</style>