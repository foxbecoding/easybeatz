<template>
    <v-card  flat color="background">
        <v-card-title class="px-0">{{title}}</v-card-title>
        <v-card-text class="px-0">
            In addition to some of the specific uses of personal data we separately describe in this Policy, 
            we use personal data for our business and commercial purposes including in the following situations:
        </v-card-text>
        <v-card-text>
            <ul>
                <li>
                    Your personal identifiers and financial information to process payments 
                    for use of the Services
                </li>
                <li>
                    Your personal identifiers (including online identifiers), geolocation data, and 
                    online Services activity information to help you efficiently access your information 
                    and features of the Services
                </li>
                <li>
                    Your device identifiers, such as your carrier code, so that we can provide you with 
                    the applicable trial offers or services in a bundled package with your carrier service
                </li>
                <li>
                    Your personal identifiers (including online identifiers) and online Services 
                    activity information to remember information so you will not have to re-enter 
                    it during your visit or the next time you visit the Services
                </li>
                <li>
                    Your personal identifiers, personal characteristics, and commercial information 
                    to provide personalized content and information to you and others, which could 
                    include online ads or other forms of marketing
                </li>
                <li>
                    Your personal identifiers (including online identifiers) and online Services 
                    activity information to provide, improve, test, and monitor the effectiveness 
                    of our Services
                </li>
                <li>
                    Your personal identifiers and commercial information to calculate royalty payments 
                    for content rights holders
                </li>
                <li>
                    Your personal identifiers (including online identifiers), personal characteristics, 
                    commercial information, and inferences on your preferences, to develop and test 
                    new products and features
                </li>
                <li>
                    Your personal identifiers (including online identifiers) and personal 
                    characteristics to monitor metrics such as total number of visitors, traffic, 
                    and demographic patterns
                </li>
                <li>
                    Your personal identifiers (including online identifiers) to diagnose or fix 
                    technology problems
                </li>
                <li>
                    Your personal identifiers (including online identifiers), personal characteristics, 
                    financial information, commercial information, and inferences of your preferences 
                    to detect, investigate and take all steps necessary to address misuse of the Services
                </li>
            </ul>
        </v-card-text>
        <v-card-text class="px-0">
            We de-identify and/or aggregate personal data we receive and may use and 
            disclose it for any business or commercial purpose.
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>

const config = useRuntimeConfig()
const company_name = ref<string>(`${config.public.COMPANY_NAME}`)
const company_url = ref<string>(`${config.public.SITE_DOMAIN}`)
const title = ref<string>("4.  USE OF PERSONAL DATA")

</script>