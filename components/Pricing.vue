<template>
    <div>
        <Promotion class="my-4"/>
        <v-row>
            <v-col 
                v-for="p_package in PRICE_PACKAGES" :key="p_package.pk"
                cols="12" 
                md="3"
                lg="3"
            >
                <v-card  rounded="xl">
                    <v-card-title :class="`text-${p_package.package_color}`">
                        {{ p_package.package_title.toUpperCase() }}
                    </v-card-title>
                    
                    <p class="text-subtitle-2 px-4">
                        ${{ p_package.package_price }} / {{ p_package.package_renewal_rate }}
                    </p>
                    <v-card-text style="height:250px">
                        <div v-for="(feature, i) in p_package.package_features">
                            <div class="d-flex flex-row">
                                <div class="mr-3"><v-icon>mdi-check</v-icon></div>
                                <div class="mb-2">
                                    {{ feature }}
                                    <p v-if="i == 0"><small>(1 Token = 1 Beat)</small></p>
                                </div>
                            </div>
                        </div>                  
                    </v-card-text>
                    <v-card-actions>
                        <v-btn 
                            @click="click_handler(p_package)"
                            :color="p_package.package_color"
                            block
                            rounded="xl"
                            variant="flat" 
                            :loading="isLoading"
                        >
                            <span class="text-black">{{ BTN_LABEL }}</span>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script lang="ts" setup>
import ApiData from '@/utils/types/ApiData'
import { PricePackage } from '@/utils/types/PricePackage'
import { usePricePackages } from '@/store/PricePackages'
import { useSubscriptionPlan } from '@/store/SubscriptionPlan'
import { useUser } from '@/store/User'
import { useDisplay } from 'vuetify';


const config = useRuntimeConfig()
const router = useRouter()
const subscriptionPlanStore = useSubscriptionPlan()
const pricePackagesStore = usePricePackages()
const pricePackages = pricePackagesStore.price_packages.sort((a, b) => Number(a.pk) - Number(b.pk))
const userStore = useUser()
const isLoading = ref<boolean>(false)

const BTN_LABEL = computed<string>(() => userStore.is_authenticated ? 'Get Started' : 'Sign Up')


const PRICE_PACKAGES = computed(() => {
    if(useDisplay().smAndDown.value){
        return pricePackages.reverse()
    }
    return pricePackages.sort((a, b) => Number(a.pk) - Number(b.pk))
})

const click_handler = async (pricePackage: PricePackage): Promise<void> => {
    isLoading.value = true
    if (!userStore.is_authenticated){
        router.push('/auth/sign-up?redirect=pricing')
        isLoading.value = false
    }else if(userStore.user.billing_info.subscription_status == 'active') {
        router.push('/account')
        isLoading.value = false
    }else{
        let apidata: ApiData = {
            data: { 
                user: userStore.user.pk,
                customer_id: userStore.user.stripe_cus_id,
                pricePackage: pricePackage.pk,
                price: pricePackage.package_price_key 
            },
            method: 'POST',
            path: `${config.public.API_STRIPE_SUBSCRIPTION}`
        }
        
        const { data, error } = await useApiPlus(apidata)
        
        if(error.value){
            console.log(error.value)
            isLoading.value = false
            return
        }

        subscriptionPlanStore.client_secret = data.value.client_secret
        subscriptionPlanStore.pricePackage_pk = pricePackage.pk
        router.push(`/subscription-plan`)
        isLoading.value = false
    }
}
</script>