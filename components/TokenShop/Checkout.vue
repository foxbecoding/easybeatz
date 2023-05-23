<template>
    <div class="my-4">
        <form id="payment-form">
            <div id="payment-element">
            <!-- Elements will create form elements here -->
            </div>
            <button
                class="v-btn v-btn--block v-btn--elevated v-theme--darkTheme bg-primary v-btn--density-default rounded-xl v-btn--size-default v-btn--variant-elevated my-4" 
                id="submit"
                @click="isLoading = true"
            >
                <span class="text-background">Pay</span>
            </button>
            <div id="error-message">
            <!-- Display error message to your customers here -->
            </div>
        </form>
        <v-progress-linear
            :active="isLoading"
            color="primary"
            indeterminate
            rounded
            height="6"
        />
    </div>
</template>
<script lang="ts" setup>
import { loadStripe, Stripe, StripeElements } from "@stripe/stripe-js"
import { useTokenShop } from '@/store/TokenShop'

definePageMeta({
  layout: "price-plans"
})

const config = useRuntimeConfig()
const isLoading = ref<boolean>(false)
const tokenShopStore = useTokenShop()


//methods
const loadStripeModal = (): void => {
    const client_secret = tokenShopStore.client_secret
    loadStripe(config.public.STRIPE_PUBLISHABLE_KEY).then(res=>{
        const stripe: Stripe = res as Stripe

        const options: any = {
            clientSecret: client_secret,
            // Fully customizable with appearance API.
            appearance: {
                theme: 'night',
            },
        }

        // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 5
        const elements: StripeElements = stripe.elements(options);

        // Create and mount the Payment Element
        const paymentElement = elements.create('payment');
        paymentElement.mount('#payment-element');

        payment(elements, stripe)
    })          
}

const payment = (elements: StripeElements, stripe: Stripe): void =>{
    const base_url = config.public.BASE_URL
    const form: any = document.getElementById('payment-form')

    form.addEventListener('submit', async (event: any) => {
        event.preventDefault();

        const {error} = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: `${base_url}/token-shop/confirmation`,
            }
        });

        if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            const messageContainer: any = document.querySelector('#error-message');
            messageContainer.textContent = error.message;
            isLoading.value = false
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
        // isLoading.value = false
    });
}

onMounted(() => {
    loadStripeModal()
})

</script>