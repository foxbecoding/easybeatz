<template>
    <v-card  flat color="background">
        <v-card-title class="px-0">{{title}}</v-card-title>
        <v-card-text class="px-0">
            a) By registering for, accessing, visiting or otherwise using the Services, 
            you consent to the transfer of your personal data to anywhere where {{company_name}} or its 
            Service Providers maintain facilities, including facilities in another country.
        </v-card-text>
        <v-card-text class="px-0">
            b) We use commercially reasonable safeguards to help keep your personal data 
            secure and to protect against accidental loss, destruction or damage. 
            Only a limited number of personnel with a legitimate business or legal need are 
            given access to users' personal data. However, we cannot ensure the security 
            of any information you transmit to {{company_name}} or guarantee that information on the 
            Services may not be accessed, used, disclosed, altered, or destroyed.
        </v-card-text>
        <v-card-text class="px-0">
            c) You are responsible for maintaining the secrecy of any non-public information 
            that you provide {{company_name}}, accessing the Services and making payments from a secure 
            computer or device, and for controlling access to emails between you and {{company_name}}, 
            at all times. Any social media services that you use to connect to the Services 
            (e.g. Facebook, Twitter) may also affect your information; we are not responsible 
            for the functionality, privacy, or security measures of any other organization.
        </v-card-text>
        <v-card-text class="px-0">
            d) Information we collect or receive about you may be accessed, processed 
            and retained for an extended period of time when it is the subject of a legal 
            request or obligation, governmental investigation, or investigations concerning possible 
            violations of our terms or policies, or otherwise to prevent harm.
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>

const config = useRuntimeConfig()
const company_name = ref<string>(`${config.public.COMPANY_NAME}`)
const company_url = ref<string>(`${config.public.SITE_DOMAIN}`)
const title = ref<string>("5.  STORING AND SECURING PERSONAL DATA")

</script>