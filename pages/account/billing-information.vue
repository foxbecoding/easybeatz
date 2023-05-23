<template>
    <div>
        <AccountTabs />
        <v-container class="pa-0" fluid>
            <div class="pa-4">
                <h1>Billing information</h1>
                <p v-if="SUB_ACTIVE">
                    Plan: 
                    <span :class="`text-${pricePackage.package_color}`">
                        {{ pricePackage.package_title }}
                    </span>
                    {{ userStore.user.billing_info.current_plan.interval }}
                </p>
                <p>Status: <span :class="STATUS_COLOR">{{ userStore.user.billing_info.subscription_status }}</span></p>
                <div v-if="SUB_ACTIVE">
                    <p v-if="userStore.user.billing_info.cancel_at_period_end">
                        Subscription ends on: {{ userStore.user.billing_info.current_plan.current_period_end }}
                    </p>
                    <p v-else>
                        Next renewal: {{ userStore.user.billing_info.current_plan.current_period_end }}
                    </p>
                </div>
                
                <v-btn
                    v-if="SUB_ACTIVE"
                    @click="cancelDialog = !cancelDialog"
                    class="my-2"
                    color="error"
                    variant="tonal"
                    rounded="xl"
                >
                    Cancel subscription
                </v-btn>
                <v-btn
                    v-else
                    @click="$router.push('/pricing')"
                    class="my-2 text-background"
                    color="primary"
                    variant="flat"
                    rounded="xl"
                >
                    Subscribe
                </v-btn>
            </div>   
            
            
            <div class="px-4">
                <h2>Payment methods</h2>
                <v-btn
                    v-if="SUB_ACTIVE"
                    class="my-2"
                    color="primary"
                    variant="tonal"
                    @click="addPaymentMethod()"
                    :loading="isLoadingAdd"
                    rounded="xl"
                >Add payment method</v-btn>
            </div>
            
            <v-list  :class="$vuetify.display.mdAndUp ? 'px-4' : 'px-0'" bg-color="background" lines="one">
                <v-divider />
                <div v-for="pm in userStore.user.billing_info.payment_methods">
                    <v-list-item
                        :title="`${pm.brand}....${pm.last4}`"
                        :subtitle="`Expires: ${pm.expires}`"
                    >
                        <template  v-slot:append>
                            <span v-if="pm.default_method">default</span>
                            <v-btn 
                                variant="plain"
                                color="primary" 
                                @click="openDialog(pm, 'update')" 
                                rounded="xl"
                                v-else
                            >
                                Set as Default
                            </v-btn>
                            <v-btn
                                v-if="!pm.default_method"
                                @click="openDialog(pm, 'delete')"
                                color="error"
                                icon="mdi-delete"
                                variant="text"
                            />
                        </template>
                    </v-list-item>
                    <v-divider />
                </div>                        
            </v-list>         
        </v-container>
        <v-dialog
            v-model="cancelDialog"
            persistent
            width="auto"
            scrim="#282828"
        >
            <v-card max-width="400" rounded="xl">
                <v-card-title class="text-wrap">
                    Canceling subscription? Your subscription will be canceled immediately.
                </v-card-title>
                <v-card-actions class="my-0">
                    <v-btn 
                        @click="close()"
                        variant="plain"
                        color="primary"
                        rounded="xl"
                        :disabled="isLoading"
                    >close</v-btn>
                    <v-btn 
                        @click="cancel()"
                        variant="plain"
                        color="primary"
                        rounded="xl"
                        :loading="isLoading"
                    >Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-if="$vuetify.display.mdAndUp"
            v-model="dialog"
            persistent
            width="auto"
            scrim="#282828"
        >
            <v-card min-width="400" max-width="600" rounded="xl">
                <v-card-title>
                    Add payment method
                </v-card-title>
                <v-progress-linear
                    :active="isProcessing"
                    class="mx-2"
                    color="primary"
                    indeterminate
                    rounded="xl"
                    height="6"
                />
                <form v-show="stripeLoaded" id="card-form" class="pt-4 pb-1 px-2">
                    <div id="card-element">
                    <!-- Elements will create form elements here -->
                    </div>
                    <button class="text-background mt-2 v-btn v-btn--block v-btn--elevated v-theme--darkTheme bg-primary v-btn--density-default rounded-xl v-btn--size-default v-btn--variant-elevated" 
                        id="submit"
                    >
                        <div class="spinner hidden" id="spinner"></div>
                        <span id="button-text">Submit</span>
                    </button>
                    <p id="card-error" class="text-error" role="alert">
                        {{ addPaymentMethodError }}
                    </p>
                </form>
                <v-card-actions class="my-0">
                    <v-btn 
                        @click="close()"
                        variant="tonal"
                        color="primary"
                        rounded="xl"
                        block
                    >close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="deleteDialog"
            persistent
            width="auto"
            scrim="#282828"
        >
            <v-card max-width="400" rounded="xl" >
                <v-card-title class="text-wrap overflow-visible">
                    Are you sure that you want to delete this payment method?
                </v-card-title>
                <v-card-actions class="my-0">
                    <v-spacer />
                    <v-btn 
                        @click="close()"
                        variant="plain"
                        color="primary"
                        rounded="xl"
                        :disabled="isLoading"
                    >close</v-btn>
                    <v-btn 
                        @click="deletePaymentMethod()"
                        variant="plain"
                        color="primary"
                        rounded="xl"
                        :loading="isLoading"
                    >Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="setDefaultDialog"
            persistent
            width="auto"
            scrim="#282828"
        >
            <v-card max-width="400" rounded="xl" >
                <v-card-title class="text-wrap overflow-visible">
                    Are you sure that you want to change your default payment method?
                </v-card-title>
                <v-card-actions class="my-0">
                    <v-spacer />
                    <v-btn 
                        @click="close()"
                        variant="plain"
                        color="primary"
                        rounded="xl"
                        :disabled="isLoading"
                    >close</v-btn>
                    <v-btn 
                        @click="setDefaultPaymentMethod()"
                        variant="plain"
                        color="primary"
                        rounded="xl"
                        :loading="isLoading"
                    >Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <ActionSheet 
            v-if="$vuetify.display.smAndDown"
            v-model="actionSheet" 
            fullscreen
            isCloseBtn
            :maxHeight="95"
            title="Add payment method"
            isScrim
            scrim="#282828"
            rounded="xl"
        >
            <v-progress-linear
                :active="isProcessing"
                class="mx-2"
                color="primary"
                indeterminate
                rounded="xl"
                height="6"
            />
            <form v-show="stripeLoaded" id="card-form" class="mx-1 pt-4 pb-1">
                <div id="card-element">
                <!-- Elements will create form elements here -->
                </div>
                <button class="text-background mt-2 v-btn v-btn--block v-btn--elevated v-theme--darkTheme bg-primary v-btn--density-default rounded-xl v-btn--size-default v-btn--variant-elevated" 
                    id="submit"
                >
                    <div class="spinner hidden" id="spinner"></div>
                    <span id="button-text">Submit</span>
                </button>
                <p id="card-error" class="text-error" role="alert">
                    {{ addPaymentMethodError }}
                </p>
            </form>
        </ActionSheet>
    </div>
</template>
<script lang="ts" setup>
import ApiData from '@/utils/types/ApiData'
import { useUser } from '@/store/User'
import { usePricePackages } from '@/store/PricePackages'
import { PricePackage } from '@/utils/types/PricePackage'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { useSnackbar } from '@/store/Snackbar'
import { loadStripe, Stripe, StripeElements, StripeCardElement } from "@stripe/stripe-js"

definePageMeta({
  middleware: ["authentication"]
})

const config = useRuntimeConfig()
const userStore = useUser()
const vDisplay = useDisplay()
const snackbarStore = useSnackbar() 
const actionSheet = ref<boolean>(false)
const dialog = ref<boolean>(false)
const deleteDialog = ref<boolean>(false)
const cancelDialog = ref<boolean>(false)
const dialogData = ref<any>(null)
const setDefaultDialog = ref<boolean>(false)
const stripeLoaded = ref<boolean>(false)
const isLoadingAdd = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const isProcessing = ref<boolean>(false)
const addPaymentMethodError = ref<string>("")
const pricePackagesStore = usePricePackages()
const pricePackage = ref<PricePackage>({} as PricePackage)
let found = pricePackagesStore.price_packages.find(x => x.pk == userStore.user.pricePackage)
if(found){ pricePackage.value = found; }

const STATUS_COLOR = computed(() => {
    if(userStore.user.billing_info.subscription_status == 'active'){
        return 'text-success'
    }
    return 'text-error'
})

const SUB_ACTIVE = computed(() => {
    if(userStore.user.billing_info.subscription_status == 'active'){
        return true
    }
    return false
})

const close = (): void => {
    dialog.value = false
    deleteDialog.value = false
    cancelDialog.value = false
    dialogData.value = null
    setDefaultDialog.value = false
    stripeLoaded.value = false
    actionSheet.value = false
}

const cancel = async (): Promise<void> => {
    isLoading.value = true
    let apiData: ApiData = {
        path: `${config.public.API_CANCEL_STRIPE_SUBSCRIPTION}0/`,
        method: 'DELETE'
    }
    const { data, error } = await useApiPlus(apiData)
    if(error.value){
        console.log(error.value)
        isLoading.value = false
        return
    }
    close()  
    isLoading.value = false
    snackbarStore.setSnackbar('Subscription canceled', true)
    userStore.setAuthUserData(data.value, true) 
}

const openDialog = async (pm: any, type: 'delete'|'update'): Promise<void> => {
    dialogData.value = pm
    if(type == 'delete'){
        deleteDialog.value = true
    }else{
        setDefaultDialog.value = true
    }
}

const set_method = (cardElement: StripeCardElement, stripe: Stripe, clientSecret: string): void => {
    let cardForm = document.getElementById('card-form') as HTMLElement; 
    
    cardForm.addEventListener('submit', async function(ev) {
        ev.preventDefault();
        isProcessing.value = true
        let result = await stripe.confirmCardSetup(
            clientSecret,
            {
                payment_method: {
                    card: cardElement,
                },
            }
        )
        if (result.error) {
            addPaymentMethodError.value = result.error.message as string
            isProcessing.value = false
            // Display error.message in your UI.
        } else {
            isProcessing.value = false
            stripeLoaded.value = false
            addPaymentMethodError.value = ""

            // The setup has succeeded. Display a success message.
            let apiData: ApiData = {
                path: `${config.public.API_USER_SESSION}`,
                method: 'GET'
            }
            const { data, error } = await useApiPlus(apiData)
            if(error.value){
                console.log(error.value)
                return
            }
            close()  
            snackbarStore.setSnackbar('Payment method added', true)
            userStore.setAuthUserData(data.value, true) 
        }
    });
}

const loadStripeModal = async (client_secret: string): Promise<void> => {
    let res = await loadStripe(config.public.STRIPE_PUBLISHABLE_KEY)
    let stripe = res as Stripe

    const options: any = {
        clientSecret: client_secret,
        // Fully customizable with appearance API.
        appearance: {
            theme: 'night',
        },
    };

    var style = {
        base: {
        fontSize: "15px",
        color: "#fff",
        fontFamily:
            "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
        fontSmoothing: "antialiased",
            "::placeholder": {
                color: "rgba(255,255,255,0.6)"
            }
        }
    };

    // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 5
    const elements: StripeElements = stripe.elements(options);

    // Create and mount the Payment Element
    const cardElement = elements.create('card', {style});
    cardElement.mount('#card-element');
    stripeLoaded.value = true
    
    set_method(cardElement, stripe, client_secret)
}

const addPaymentMethod = async (): Promise<void> => {
    isLoadingAdd.value = true
    let apiData: ApiData = {
        path: `${config.public.API_USER_BILLING_INFO}`,
        method: 'GET'
    }
    const { data, error } = await useApiPlus(apiData)
    if(error.value){
        isLoadingAdd.value = false
        return
    }
    isLoadingAdd.value = false
    if(vDisplay.mdAndUp.value){
        dialog.value = true
    }else{
        actionSheet.value = true
    }
    loadStripeModal(data.value)
}

const setDefaultPaymentMethod = async (): Promise<void> => {
    isLoading.value = true
    let apiData: ApiData = {
        path: `${config.public.API_USER_BILLING_INFO}0/`,
        method: 'PUT',
        data: {pm_id: dialogData.value.pm_id}
    }
    const { data, error } = await useApiPlus(apiData)
    if(error.value){
        console.log(error.value)
        isLoading.value = false
        return
    }
    close()  
    isLoading.value = false
    snackbarStore.setSnackbar('Default payment method updated', true)
    userStore.setAuthUserData(data.value, true)
}

const deletePaymentMethod = async (): Promise<void> => {
    isLoading.value = true
    let apiData: ApiData = {
        path: `${config.public.API_USER_BILLING_INFO}0/`,
        method: 'DELETE',
        data: {pm_id: dialogData.value.pm_id}
    }
    const { data, error } = await useApiPlus(apiData)
    if(error.value){
        console.log(error.value)
        isLoading.value = false
        return
    }
    close()  
    isLoading.value = false
    snackbarStore.setSnackbar('Payment method delete', true)
    userStore.setAuthUserData(data.value, true) 
}

useHead({ 
    title: () => `Billing information - ${config.public.SITE_NAME}`    
})
</script>
<style scoped>
#card-element {
  border-radius: 8px ;
  padding: 12px;
  border: 1px solid rgba(50, 50, 93, 0.1);
  height: 44px;
  width: 100%;
  background: #313131;
}

#card-error {
  color: rgb(105, 115, 134);
  text-align: left;
  font-size: 13px;
  line-height: 17px;
  margin-top: 12px;
}
</style>