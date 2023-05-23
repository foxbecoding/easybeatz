<template>
    <div>
        <v-container
            class="py-0" 
            :class="$vuetify.display.mdAndUp ? 'px-4' : 'px-0'"
        >
            <BeatsListTitle :class="$vuetify.display.mdAndUp ? 'mx-0' : 'mx-4'">
                Cart
            </BeatsListTitle>
            <Beats 
                v-if="cartStore.cart.length > 0"
                :beats="cartStore.cart" 
                :key="cartStore.cart.length"
            />
            <div>
                <v-alert
                    v-model="EMPTY_CART_ALERT"
                    border="start"
                    variant="tonal"
                    color="primary"
                    class="mb-4"
                    :class="$vuetify.display.smAndDown ? 'mx-4' : ''"
                >
                    Your cart is empty.  Please add some beats in your cart.
                </v-alert>
                <v-alert
                    v-model="IS_CART_ERROR"
                    border="start"
                    variant="tonal"
                    color="error"
                    class="my-4"
                    :class="$vuetify.display.smAndDown ? 'mx-4' : ''"
                >
                    {{ cartError }}
                </v-alert>
                <div 
                    v-if="cartStore.cart.length > 0"
                    class="d-flex flex-row-reverse"
                >
                    <div
                        class="text-end ma-4 d-flex flex-column "
                    >
                        <p>Total beats: {{ cartStore.cart.length }}</p>
                        <p>
                            Total: 
                            <v-icon color="warning">mdi-poker-chip</v-icon>
                            {{ cartStore.cart.length }}x
                        </p>
                        <v-btn 
                            rounded="xl" 
                            color="primary text-background"
                            class="my-2"
                            @click="checkout()"
                        >
                            Checkout
                        </v-btn>
                    </div> 
                </div>  
            </div>
        </v-container>
    </div>
</template>
<script lang="ts" setup>
import { useCart } from '@/store/Cart'
import { useUser } from '@/store/User'
import { Beat } from '@/utils/types/Beats'
import ApiData from '@/utils/types/ApiData'


const config = useRuntimeConfig()
const title = ref<string>('Cart')
const description = ref<string>('Add beats to your cart and purchase them with tokens.')
const { seo } = useSEO(title.value, description.value)
const cartStore = useCart()
const userStore = useUser()
const user = userStore.user
const router = useRouter()
const isAuth = userStore.is_authenticated
const cartError = ref<string>('')


const EMPTY_CART_ALERT = computed<boolean>((): boolean => {
    return cartStore.cart.length == 0
})

const IS_CART_ERROR = computed<boolean>((): boolean => {
    return cartError.value != ''
}) 

const checkout = async (): Promise<void> => {
    if(!isAuth) { router.push('/auth/sign-in'); return; }
    const cartItemsPks = ref<string[]>([])
    let cartItems: Beat[] = cartStore.cart
    if(cartItems.length > 0){
        cartItems.forEach(item => {
            cartItemsPks.value.push(item.pk)
        })
    }
    let apiData: ApiData = {
        data: { beats: cartItemsPks.value, user: userStore.user.pk },
        method: 'POST',
        path: `${config.public.API_TOKEN_PURCHASES}`
    }

    const { data, error } = await useApiPlus(apiData)
    if(error.value){
        cartError.value = error.value.data
        return
    }
    cartError.value = ''
    cartStore.cart = []
    data.value.beats.forEach((beat_pk: string) => {
        user.purchased_beats.push(beat_pk)    
    })
    useGetBeats().enhanceBeats()
    user.token_data.tokens = data.value.tokens
    router.push('/account/purchases')
}

useHead(seo)
</script>