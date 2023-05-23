<template>
    <div>
        <v-card 
            v-if="isShop"
            class="mx-auto pa-4" 
            flat 
            color="background" 
            max-width="400"
        >
            <v-card-title class="px-0 text-center">
                Token Shop
            </v-card-title>
            <v-card-subtitle class="mb-3 px-0 text-center">
                Buy tokens and get any beat you want!<br/>
                (1 token = 1 beat)
            </v-card-subtitle>
            <div class="ma-4">
                <v-icon class="mx-auto d-block" size="100" color="warning">mdi-poker-chip</v-icon>
            </div>
            <div class="ma-4">
                <p class="text-h4 text-center font-weight-bold">${{tokenShopStore.price}}/token</p>
            </div>
            <div class="d-flex justify-center">
                <v-btn 
                    @click="tokenShopStore.decrease()"
                    class="text-background"
                    color="primary" 
                    icon="mdi-minus"
                    rounded 
                />
                <p class=" mx-4 font-weight-bold" style="font-size: 2rem">{{ tokenShopStore.quantity }}</p>
                <v-btn 
                    @click="tokenShopStore.increase()"
                    class="text-background"
                    color="primary" 
                    icon="mdi-plus"
                    rounded 
                />
            </div>
            <div class="ma-4 text-center">
                <p class=" font-weight-bold">
                    Quantity: 
                    <v-icon color="warning">mdi-poker-chip</v-icon>
                    {{ tokenShopStore.quantity }}x
                </p>
                <p class=" font-weight-bold">Sub Total: ${{ tokenShopStore.SUBTOTAL }}</p>
            </div>
            <v-btn 
                @click="checkout()"
                class="text-background"
                :loading="isLoading"
                color="primary" 
                variant="flat" 
                rounded="xl"
                block 
            >
                Checkout
            </v-btn>
        </v-card>
        <v-card 
            v-else
            flat 
            class="mx-auto pa-4" 
            color="background" 
            max-width="400" 
        >
            <v-card-title class="px-0 text-start">
                Checkout
            </v-card-title>
            Quantity: <v-icon color="warning">mdi-poker-chip</v-icon> {{ tokenShopStore.quantity }}x <br />
            Total: ${{ tokenShopStore.SUBTOTAL }}
            <TokenShopCheckout />
        </v-card> 
    </div>   
</template>

<script lang="ts" setup>
import ApiData from '@/utils/types/ApiData'
import { useUser } from '@/store/User'
import { useTokenShop } from '@/store/TokenShop'

const config = useRuntimeConfig()
const router = useRouter()
const userStore = useUser()
const tokenShopStore = useTokenShop()
const isShop = ref<boolean>(true)
const isLoading = ref<boolean>(false)

onMounted(() => {
    if(userStore.is_authenticated && ('billing_info' in userStore.user)){
        if(userStore.user.billing_info.subscription_status == 'active'){
            tokenShopStore.price = 7.77
        }
    }
})

//methods
const checkout = async (): Promise<void> => {
    isLoading.value = true
    if(!userStore.is_authenticated){ router.push('/auth/sign-in?redirect=token-shop'); return; }
    let apiData: ApiData = {
        path: `${config.public.API_TOKEN_SHOP}`,
        method: 'POST',
        data: {
            email: userStore.user.email, 
            fullname: userStore.user.fullname,
            quantity: tokenShopStore.quantity,
            amount: tokenShopStore.SUBTOTAL,
            user: userStore.user.pk,
            stripe_cus_id: userStore.user.stripe_cus_id
        }
    }
    
    const { data, error } = await useApiPlus(apiData)
    if(error.value){
        isLoading.value = false
        return
    }
    isLoading.value = false
    tokenShopStore.client_secret = data.value
    isShop.value = false
}

</script>
<style scoped>
</style>