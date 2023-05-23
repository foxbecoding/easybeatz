<template>
    <div style="position: sticky; top: 57px; z-index: 1;">
        <v-tabs
            v-model="tab"
            bg-color="background"
            color="primary"
            class="tab-bar"
        >
            <v-tab 
                v-for="tab in tabs"
                :value="tab.route_name"
                :to="tab.to" 
            >
                {{ tab.title }}
            </v-tab>
        </v-tabs>
    </div>
</template>
<script lang="ts" setup>
import LinkList from '@/utils/types/LinkList';

const tab = ref(null)
const tabs = ref<LinkList[]>([
    { 
        title: 'Account Details', 
        route_name: 'account',
        to: '/account'
    },
    { 
        title: 'Beat purchases', 
        route_name: 'account-purchases',
        to: '/account/purchases'
    },
    { 
        title: 'Wishlist', 
        route_name: 'account-favorites',
        to: '/account/favorites'
    },
    // { 
    //     title: 'History', 
    //     route_name: 'account-history',
    //     to: '/account/history'
    // },
    { 
        title: 'Billing Information', 
        route_name: 'account-billing-information',
        to: '/account/billing-information'
    },
])
</script>
<style>
.tab-bar{
    touch-action: none !important;
}
</style>