<template>
    <v-card  flat color="background">
        <v-card-title class="px-0">{{title}}</v-card-title>
        <v-card-subtitle class="px-0">Customer support, information, questions, complaints</v-card-subtitle>
        <v-card-text class="px-0">
            For customer support with account and payment related questions ("Customer Support Queries"), 
            please use Customer Support resources listed on the Contact Us section of our website.
        </v-card-text>
        <v-card-text class="px-0">
            If you have any questions concerning the {{company_name}} Service or these Terms 
            (including any additional {{company_name}} terms and conditions incorporated herein), 
            please contact {{company_name}} Customer Service by visiting the Contact Us section of our website.
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>

const config = useRuntimeConfig()
const company_name = ref<string>(`${config.public.COMPANY_NAME}`)
const title = ref<string>(`5.  Customer Support, Information, Questions, and Complaints`)

</script>