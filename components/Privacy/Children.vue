<template>
    <v-card  flat color="background">
        <v-card-title class="px-0">{{title}}</v-card-title>
        <v-card-text class="px-0">
            The Services and their content are not directed at children under the age of 13. 
            {{company_name}} does not knowingly collect or solicit any personal data from anyone under 
            the age of 13 or knowingly allow such persons to register for the Services. 
            In the event that we learn that we have collected personal data from a child 
            under age 13 without parental consent, we will delete that information as quickly as possible. 
            If you believe that we might have any personal data from or about a child under 13, 
            please notify us immediately by sending an email to support@{{company_url}}.
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>

const config = useRuntimeConfig()
const company_name = ref<string>(`${config.public.COMPANY_NAME}`)
const company_url = ref<string>(`${config.public.SITE_DOMAIN}`)
const title = ref<string>("2.  CHILDREN AND PRIVACY")

</script>