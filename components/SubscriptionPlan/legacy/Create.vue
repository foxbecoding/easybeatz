<template>
    <div>
        <v-form
            ref="form"
            class="pa-4"
            v-model="valid"
            lazy-validation
        >
            <div v-for="(field, i) in formFields" :key="i">
                <v-text-field
                    v-if="field.show"
                    :id="field.id"
                    :rules="field.rules"
                    :label="`${field.label}*`"
                    :type="field.type"
                    :prepend-inner-icon="field.prependIcon"
                    @update:model-value="updateModelValue(field.id, $event)"
                    @keypress.enter="submit()"
                    v-model="field.model"
                    color="primary"
                    required
                >
                </v-text-field>
            </div>
        </v-form>
        <v-alert
            v-model="formError"
            border="start"
            variant="tonal"
            color="error"
            class="mb-4 mx-4"
        >
            {{ formErrorMsg }}
        </v-alert>
        <v-card-actions>
            <v-btn 
                color="primary"
                rounded="xl"
                block
                :loading="isLoading"
                variant="flat" 
                @click="submit()"
            >
                <span class="text-black">Submit</span>
            </v-btn>
        </v-card-actions>
        <v-card-actions>
            <v-btn 
                color="warning"
                rounded="xl"
                block
                variant="tonal" 
                to="/pricing"
            >
                Change plan
            </v-btn>
        </v-card-actions>
    </div>
</template>
<script lang="ts" setup>
import ApiData from '@/utils/types/ApiData'
import { FormField } from '@/utils/types/FormFields'
import { PricePackage } from '@/utils/types/PricePackage'
import { useSubscriptionPlan } from '@/store/SubscriptionPlan' 
import { PropType } from 'vue'

definePageMeta({
  layout: "price-plans"
})

const props = defineProps({
    pricePackage: {
        type: Object as PropType<PricePackage>,
        required: true
    }    
})

const config = useRuntimeConfig()
const route = useRoute()
const subscriptionPlanStore = useSubscriptionPlan()
const isLoading = ref<boolean>(false)
const form = ref()
const formError = ref<boolean>(false)
const formErrorMsg = ref<boolean>(false)
const valid = ref<boolean>(true)
const fullname =  ref<string>('')
const fullnameRules = ref([
    (v: any) => !! v || 'Name is required',
])
const email = ref<string>('')
const emailRules = ref([
    (v: any) => !! v || 'E-mail is required',
    (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
])
const formFields = ref<FormField[]>([
    {
        id: '1', 
        show: true, 
        model: fullname.value, 
        rules: fullnameRules.value, 
        label: 'Fullname',
        type: 'text',
        prependIcon: 'mdi-account'
    },
    {
        id: '2', 
        show: true, 
        model: email.value, 
        rules: emailRules.value, 
        label: 'E-mail',  
        type: 'text',
        prependIcon: 'mdi-email'
    }
])

// methods
const updateModelValue = (id: string, e: any): void => {
    switch(id) {
        case '1':
            fullname.value = e
            break;
        case '2':
            email.value = e
        default:
            // code block
    }
}

const submit = async (): Promise<void> => {
    isLoading.value = true
    const isValid: boolean = await useValidateForm(form.value)
    if(!isValid) { isLoading.value = false; return; }
    let apidata: ApiData = {
        data: { 
            email: email.value, 
            name: fullname.value,
            stripe_price_key: props.pricePackage.package_price_key 
        },
        method: 'POST',
        path: `${config.public.API_STRIPE_SUBSCRIPTION}`
    }
    const { data, error } = await useApiPlus(apidata)
    if(error.value){
        isLoading.value = false
        formError.value = true
        formErrorMsg.value = error.value.data
        return
    }
    isLoading.value = false
    formError.value = false
    subscriptionPlanStore.userAttempt = {
        fullname: fullname.value,
        email: email.value,
        pricePackage_pk: props.pricePackage.pk,
        username: data.value.customer_id,
        og_username: data.value.customer_id,
        stripe_cus_id: data.value.customer_id
    }
    subscriptionPlanStore.client_secret = data.value.client_secret
    subscriptionPlanStore.customer_id = data.value.customer_id
    subscriptionPlanStore.isCheckoutReady = true
}
</script>