<template>
    <v-card  flat color="background">
        <v-card-title class="px-0">{{title}}</v-card-title>
        <v-card-text class="px-0">
            This Privacy Policy together with the Terms and Conditions of Service set out how 
            {{company_name}} processes any personal data that we collect about you, or 
            which you provide to us, when you access and use the {{company_name}} services, 
            mobile and device applications or associated websites, social media pages, and our emails. 
            Our policy is to process your personal data at all times in 
            accordance with applicable data protection laws and regulations. 
            By “personal data,” we mean any information that identifies, relates to, or 
            describes, directly or indirectly, a particular individual.
        </v-card-text>
        <v-card-text class="px-0">
            If you have questions, comments or requests about this Privacy Policy please 
            contact us by sending an email to support@{{company_url}}.
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>

const config = useRuntimeConfig()
const company_name = ref<string>(`${config.public.COMPANY_NAME}`)
const company_url = ref<string>(`${config.public.SITE_DOMAIN}`)
const title = ref<string>("1.  Introduction")

</script>