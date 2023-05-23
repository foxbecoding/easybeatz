<template>
    <v-container 
        class="py-0" 
        :class="$vuetify.display.mdAndUp ? 'px-4' : 'px-0'"
    >
        <v-img class="mx-auto" src="/logo.png" width="150"/>
        <v-card 
            class="mx-auto" 
            color="background" 
            max-width="400"
            flat 
        >
            <v-card-title class="text-center">
                <p>Payment successful</p>
                <p>Thank you for subscribing with us!</p>
            </v-card-title>
            <v-card-text class="text-center">
                Browse beats and use your tokens to buy them.
            </v-card-text>  
            <v-card-actions>
                <v-btn
                    v-if="!disabled_btn"
                    @click="$router.replace('/beats')" 
                    class="text-background"
                    block 
                    rounded="xl" 
                    color="primary" 
                    variant="flat"
                >
                    Browse Beats
                </v-btn>
                <v-btn
                    v-else
                    @click="$router.replace('/')" 
                    block 
                    rounded="xl"
                    variant="flat"
                    :disabled="true"
                >
                    Browse Beats
                </v-btn>
            </v-card-actions>    
        </v-card>
    </v-container>
</template>
<script lang="ts" setup>
import { loadStripe, Stripe } from "@stripe/stripe-js"
import ApiData from '@/utils/types/ApiData'
import { useUser } from '@/store/User'
definePageMeta({
  layout: "price-plans"
})

const config = useRuntimeConfig()
const route = useRoute()
const userStore = useUser()
const disabled_btn = ref<boolean>(true)

//methods
const validate_confirmation = async (): Promise<void> => {
    const payment_intent = route.query.payment_intent
    const payment_intent_client_secret: any = route.query.payment_intent_client_secret
    const redirect_status = route.query.redirect_status
    let res = await loadStripe(config.public.STRIPE_PUBLISHABLE_KEY)
    const stripe: Stripe = res as Stripe
    // Retrieve the PaymentIntent
    if(payment_intent_client_secret){
        let {paymentIntent} = await stripe.retrievePaymentIntent(payment_intent_client_secret)
        // Inspect the PaymentIntent `status` to indicate the status of the payment
        // to your customer.
        //
        // Some payment methods will [immediately succeed or fail][0] upon
        // confirmation, while others will first enter a `processing` state.
        //
        // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
        // API_COMPLETE_STRIPE_SUBSCRIPTION
        if((paymentIntent?.status === 'succeeded') && (paymentIntent?.id === payment_intent)){
            let apidata: ApiData = {
                data: {pi: payment_intent},
                method: 'POST',
                path: `${config.public.API_COMPLETE_STRIPE_SUBSCRIPTION}`
            }
            const { data, error } = await useApiPlus(apidata)
            if(error.value){
                console.log(error.value)
                return
            }
            
            userStore.user = data.value
            userStore.is_authenticated = true
            disabled_btn.value = false
        }
    }
    
}

onMounted(() => {
    validate_confirmation()
})


useHead({ 
    title: () =>  `Confirmation - ${config.public.SITE_NAME}` 
})
</script>