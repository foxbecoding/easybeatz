<template>
    <v-card  flat color="background">
        <v-card-title class="px-0">{{title}}</v-card-title>
        <v-card-text class="px-0">
            We collect the following categories of personal data:
        </v-card-text>
        <v-card-text class="px-0">
            a) Information you provide us directly. When you register as a user for the online Services 
            (through a paid subscription) you provide us with 
            certain information that we store. This may include:
        </v-card-text>
        <v-card-text>
            <ul>
                <li>
                    personal identifiers (such as your name, username, social media name, 
                    address, email address, password, and phone number)
                </li>
                <li>device identifiers (such as your carrier identifier)</li>
                <li>personal characteristics (such as your date of birth, gender, and the language you speak)</li>
                <li>financial information</li>
                <li>audio and visual information (such as account photo, other photos, and other materials)</li>
                <li>geolocation data and other metadata (such as content creation date, formatting 
                    information, and location information (i.e., geotags))
                </li>
                <li>
                    commercial information (such as download and purchase history for 
                    subscriptions and token purchases)
                </li>
                <li>
                    communications between you and {{company_name}} (such as comments on the Services 
                    (including social media pages) and customer service requests)
                </li>
                <li>inferences from any of the above categories about your preferences</li>
            </ul>
        </v-card-text>
        <v-card-text class="px-0">
            b) Information collected from third parties. We may receive information about 
            you from third parties who may have collected and transferred your personal data 
            to us in accordance with their own privacy policies and/or terms of use. This may 
            include personal identifiers (such as your name, address, email address, and phone number) 
            and personal characteristics (such as your data of birth and gender). Examples of such third 
            parties include social media networks such as Facebook or Twitter. Where we receive such 
            information from such third parties, we may combine it with the other personal data that 
            we have collected about you as set out herein and use such information either alone or in 
            combination with the other personal data we hold for the purposes outlined in this Privacy Policy.
        </v-card-text>
        <v-card-text class="px-0">
            c) Automatic information collection. When you use the online Services, we and 
            service providers and trusted partners use cookies, log data, and similar technology 
            to automatically record personal identifiers (such as your IP address and device identifiers), 
            information about your device and browser (such as your browser type, locale preferences, 
            and mobile carrier) and information concerning your online Services usage activity 
            (such as favorites, playlists created, tracks played and downloaded, activity in the 
            {{company_name}} applications, offlined tracks, date and time of listening, clicks and views of 
            content and pages, product ID, time of log-in, and what version of the Services you use, 
            email opens, clicks, and forwards, the link you used to reach them, and the content and 
            advertising displayed on them and our content and advertising on other websites and online services). 
            If you access the Services via a handheld device, we also store a device identifier that uniquely 
            identifies the device.
        </v-card-text>

        <v-card-text class="px-0">
            We and our service providers and trusted partners use this information (i) to provide, 
            tailor, and personalize the Services to you; (ii) to enable certain features on the Services; 
            (iii) for service improvement purposes; and (iv) for marketing and advertising purposes 
            (as further described herein). We may also use internal or third-party analytics tools to 
            help us measure traffic and usage trends for the Services that assist us in providing and 
            improving the Services.
        </v-card-text>
        <v-card-text class="px-0">
            We permit service providers and trusted partners to track visitors to the Services 
            and the activities of those visitors on the Services over time, and they may track those 
            visitors across other websites and online services over time, if those websites and apps 
            also use the same partners. In these situations, you are using and directing us to 
            intentionally disclose personal information (including personal identifiers) to those 
            service providers and trusted partners so they can perform those services.
        </v-card-text>
        <v-card-text class="px-0">
            The Services may use both temporary (“session”) and persistent cookies. 
            The Help feature on most browsers will tell you how to prevent your browser 
            from accepting new cookies, how to have the browser notify you when you receive a new cookie, 
            or how to disable cookies. This may, however, impact the functionality of the Services.
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>

const config = useRuntimeConfig()
const company_name = ref<string>(`${config.public.COMPANY_NAME}`)
const company_url = ref<string>(`${config.public.SITE_DOMAIN}`)
const title = ref<string>("3.  COLLECTION OF PERSONAL DATA")

</script>