<template>
    <v-container class="pa-4">
        <v-card
            rounded="xl"
            max-width="400px" 
            color="background"
            class="mx-auto"
        >
            <v-card-title>
                <p>Payment successful</p>
                <p>Thank you for subscribing with us!</p>
            </v-card-title>
            <v-card-text>
                Please check your email.  
                We've sent you some important information in regards to your account.
            </v-card-text>  
            <v-card-actions>
                <v-btn 
                    block 
                    color="primary" 
                    rounded="xl"
                    variant="flat"
                    to="/beats"
                >
                    <span class="text-black">Explore Beats</span>
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

//methods
const validate_confirmation = async (): Promise<void> => {
    const stripe_cus_id = route.query.cus
    const email = route.query.email
    const fullname = route.query.name
    const pp_key = route.query.pp_key
    const payment_intent = route.query.payment_intent
    const payment_intent_client_secret: any = route.query.payment_intent_client_secret
    const redirect_status = route.query.redirect_status
    let res = await loadStripe(config.public.STRIPE_PUBLISHABLE_KEY)
    const stripe: Stripe = res as Stripe
        // Retrieve the PaymentIntent
    let {paymentIntent} = await stripe.retrievePaymentIntent(payment_intent_client_secret)
    const message = document.querySelector('#message')
    // Inspect the PaymentIntent `status` to indicate the status of the payment
    // to your customer.
    //
    // Some payment methods will [immediately succeed or fail][0] upon
    // confirmation, while others will first enter a `processing` state.
    //
    // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
    if(paymentIntent?.status == 'succeeded'){
        let apidata: ApiData = {
            data: { 
                email: email, 
                fullname: fullname,
                stripe_cus_id: stripe_cus_id,
                price_package_pk: pp_key
            },
            method: 'POST',
            path: `${config.public.API_COMPLETE_STRIPE_SUBSCRIPTION}`
        }
        const { data, error } = await useApiPlus(apidata)
        if(error.value){
            console.log(error.value)
        }
        userStore.user = data.value
        userStore.is_authenticated = true
    }
}

onMounted(() => {
    validate_confirmation()
})


const seoData = reactive({
    title: 'Confirmation',
    description: 'Confirmation page'
})

const { seo } = useSEO(seoData.title, seoData.description)

useHead(seo)
</script>