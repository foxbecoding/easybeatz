<template>
    <v-toolbar 
        class="text-end"
        :class="$vuetify.display.mdAndUp ? 'toolbar' : 'bg-transparent'" 
        :height="toolbarHeight"
    >
        <v-spacer />
        <v-btn
            v-if="SHOW_SIGN_IN_BTN"
            color="primary"
            variant="outlined"
            size="x-small"
            to="/auth/sign-in"
        >
            <v-icon class="mr-2">mdi-account-circle-outline</v-icon>
            sign in
        </v-btn>
        <v-btn
            v-if="SHOW_MOBILE_SEARCH"
            @click="openMobileSearch()"
            :class="APP_BTNS_COLOR" 
            size="small"
            variant="text"
            icon
            flat
        >
            <v-icon size="x-large">mdi-magnify</v-icon>
        </v-btn>
        <v-btn
            v-if="SHOW_TOKENS_BTN"
            @click="tokenDataStore.isOpen = !tokenDataStore.isOpen"
            :class="APP_BTNS_COLOR" 
            color="warning"
            size="small"
            variant="text"
            icon
            flat
        >
            <v-icon color="warning" size="x-large">mdi-poker-chip</v-icon>
        </v-btn> 
        <v-btn
            v-if="$route.name != 'cart' && $vuetify.display.mdAndUp"
            :class="APP_BTNS_COLOR" 
            to="/cart"
            color="primary"
            size="small"
            variant="text"
            icon
            flat
        >
            <v-badge
                color="warning"
                :content="cartStore.cart.length"
                :dot="cartStore.cart.length == 0 ? true : false"
            >
                <v-icon size="x-large" color="primary">mdi-cart</v-icon>
            </v-badge>
        </v-btn>
    </v-toolbar>
</template>
    
<script lang="ts" setup>
import { useDisplay } from 'vuetify'
import { useCart } from '@/store/Cart'
import { useUser } from '@/store/User'
import { useTokenData } from '@/store/TokenData'

const tokenDataStore = useTokenData()
const route = useRoute()
const cartStore = useCart()
const pageYOffset = ref<number>(0)
const vDisplay = useDisplay()
const userStore = useUser()
const toolbarHeight = ref<number>(56)

const APP_BTNS_COLOR = computed(() => {
    if(pageYOffset.value <= 40 ){
        return 'app-bar-transparent-btn'
    }
    return 'app-bar-solid-btn'
})

const SHOW_MOBILE_SEARCH = computed<boolean>(
    (): boolean => {
        let auth_paths: string[]  = ['auth-sign-in', 'auth-sign-up', 'auth-forgot-password']
        return vDisplay.smAndDown.value && !auth_paths.includes(route.name as string) ? true : false
    }
)

const SHOW_SIGN_IN_BTN = computed<boolean>(
    (): boolean => (!userStore.is_authenticated && vDisplay.mdAndUp.value) && route.name != 'auth-sign-in'
)

const SHOW_TOKENS_BTN = computed<boolean>(
    (): boolean => {
        if(vDisplay.smAndDown.value){ return true; }
        else if((vDisplay.mdAndUp.value && route.name == 'playing')) { return true; }
        return false
    }
)

//methods
const openMobileSearch = (): void => {
   useSearch().searchBeatsStore.show_mobile_search = true
}

</script>
<style scoped>
.toolbar {
    background: rgba(15,15,15,0.1)  !important;
}
.toolbar:before{
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
.app-bar-transparent-btn {
    background: transparent !important;
}
.app-bar-solid-btn {
    background: #030303 !important;
}

</style>