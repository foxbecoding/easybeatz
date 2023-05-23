<template>
    <v-card  flat color="background">
        <v-card-title class="px-0">{{title}}</v-card-title>
        <v-card-subtitle class="px-0">{{company_name}} Service options</v-card-subtitle>
        <v-card-text class="px-0">
            We provide numerous {{company_name}} Service options. Certain {{company_name}} Service options are provided free-of-charge, 
            while other options require payment before they can be accessed (the "Paid Subscriptions"). 
            We may also offer special promotional plans, memberships, or services, including offerings of 
            third-party products and services.  We are not responsible for the products and services 
            provided by such third parties.   
        </v-card-text>
        <v-card-subtitle class="px-0">Service limitations and modifications</v-card-subtitle>
        <v-card-text class="px-0">
            We use reasonable efforts to keep the {{company_name}} Service operational and to provide you with a personalized, 
            immersive audio experience. However, our service offerings 
            and their availability may change from time to time, without liability to you; for example:
        </v-card-text>
        <v-card-text class="pr-0">
            <ul>
                <li class="my-2">
                    The {{company_name}} Services may experience temporary interruptions due to technical difficulties, 
                    maintenance or testing, or updates, including those required to reflect changes in relevant 
                    laws and regulatory requirements.
                </li>
                <li class="my-2">
                    We aim to evolve and improve the {{company_name}} Service constantly, and we may modify, suspend, 
                    or stop (permanently or temporarily) providing all of part of the {{company_name}} Service 
                    (including particular functions, features, subscription plans, and promotional offerings);
                </li>
                <li class="my-2">
                    {{company_name}} has no obligation to provide any specific content through the {{company_name}} Service, 
                    and {{company_name}} or the applicable owners may remove particular songs, videos, 
                    podcasts, and other Content without notice.
                </li>
            </ul>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>

const config = useRuntimeConfig()
const company_name = ref<string>(`${config.public.COMPANY_NAME}`)
const title = ref<string>(`2.  The ${config.public.SITE_NAME}  Service Provided by Us`)

</script>
<style scoped>
</style>