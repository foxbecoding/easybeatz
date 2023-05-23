<template>
    <v-container class="pa-4">
        <v-card
            v-if="pricePackage" 
            rounded="xl"
            max-width="400px" 
            color="background"
            class="mx-auto"
        >
            <v-card-title class="pb-0">
                Plan 
                <span :class="`text-${pricePackage.package_color}`">
                    {{ pricePackage.package_title.toUpperCase() }}
                </span>
            </v-card-title>  
            <p class="text-subtitle-2 px-4">
                ${{ pricePackage.package_price }} / {{ pricePackage.package_renewal_rate }}
            </p>
            <v-card-text class="py-0">
                {{ pricePackage.package_features[0] }}
            </v-card-text>  

            <SubscriptionPlanCheckout />
            
        </v-card>
    </v-container>
</template>
<script lang="ts" setup>
import { usePricePackages } from '@/store/PricePackages'
import { useSubscriptionPlan } from '@/store/SubscriptionPlan'
import { PricePackage } from '@/utils/types/PricePackage'

definePageMeta({
  layout: "price-plans"
})

const { ssrContext } = useNuxtApp()
const route = useRoute()
const subscriptionPlanStore = useSubscriptionPlan()
const pricePackagesStore = usePricePackages()
const pricePackages = pricePackagesStore.price_packages
const pricePackage = ref<PricePackage>()
const pageTitle = ref<string>('')

onMounted(() => {
    let found_package = pricePackages.find(x => x.pk == subscriptionPlanStore.pricePackage_pk)
    if(found_package){
        pricePackage.value = found_package
        pageTitle.value = 'Plan - '+found_package.package_title+' | EasyBeatz'
    } 
})

if (ssrContext) {
    ssrContext.nuxt.hook('app:rendered', () => {
        let found_package = pricePackagesStore.price_packages.find(x => x.pk == route.params.id)
        if(found_package){
            pageTitle.value = 'Plan - '+found_package.package_title+' | EasyBeatz'
        }
    })
}

useHead({ 
    title: () => pageTitle.value
})
</script>