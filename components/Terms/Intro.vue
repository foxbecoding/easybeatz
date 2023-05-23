<template>
    <v-card  flat color="background">
        <v-card-title class="px-0">{{title}}</v-card-title>
        <v-card-subtitle class="px-0">Welcome to {{company_name}}!</v-card-subtitle>
        <v-card-text class="px-0">
            Thank you for using the {{company_name}} platform and the products, 
            services and features we make available to you as 
            part of the platform (collectively, the “Service”).  
        </v-card-text>
        <v-card-subtitle class="px-0">Our Service</v-card-subtitle>
        <v-card-text class="px-0">
            The Service allows you to discover, listen and download instrumentals and acts as a 
            distribution platform for original content creators and advertisers large and small.
        </v-card-text>
        <v-card-subtitle class="px-0">Age and eligibility requirements</v-card-subtitle>
        <v-card-text class="px-0">
            BY USING THE {{company_name.toUpperCase()}} SERVICE, YOU AFFIRM THAT YOU ARE 18 YEARS OR OLDER TO ENTER INTO THESE TERMS, 
            OR, IF YOU ARE NOT, THAT YOU ARE 13 YEARS OR OLDER AND HAVE OBTAINED PARENTAL OR GUARDIAN 
            CONSENT TO ENTER INTO THESE TERMS. Additionally, in order to use the {{company_name}} Service and 
            access any Content, you represent that: you reside in the United States, and any registration 
            and account information that you submit to {{company_name}} is true, accurate, 
            and complete, and you agree to keep it that way at all times.
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>

const config = useRuntimeConfig()
const company_name = ref<string>(`${config.public.COMPANY_NAME}`)
const title = ref<string>("1.  Introduction")

</script>