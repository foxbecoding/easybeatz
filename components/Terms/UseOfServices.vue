<template>
    <v-card  flat color="background">
        <v-card-title class="px-0">{{title}}</v-card-title>
        <v-card-subtitle class="px-0">Creating a {{company_name}} account</v-card-subtitle>
        <v-card-text class="px-0">
            You may need to create a {{company_name}} account to use all or part of the {{company_name}} Service. 
            Your username/email and password are for your personal use only and should be kept confidential. 
            You understand that you are responsible for all use (including any unauthorized use) of your 
            username/email and password. Notify our Customer Service team immediately if your username/email or password 
            is lost or stolen, or if you believe there has been unauthorized access to your account. 
        </v-card-text>
        <v-card-text class="px-0">
            {{company_name}} may reclaim, or require you to change, your username for any reason.
        </v-card-text>
        <v-card-subtitle class="px-0">Your rights to use the {{company_name}} Service</v-card-subtitle>
        <v-card-subtitle class="px-0">Access to the {{company_name}} Services</v-card-subtitle>
        <v-card-text class="px-0">
            Subject to your compliance with these Terms (including any other applicable terms and conditions), 
            we grant to you limited, non-exclusive, revocable permission to make personal, non-commercial use of the 
            {{company_name}} Service and the Content (collectively, "Access"). This Access shall remain in effect unless and 
            until terminated by you or {{company_name}}. You agree that you will not redistribute or transfer the 
            {{company_name}} Service or the Content.
        </v-card-text>
        <v-card-text class="px-0">
            The {{company_name}} software applications and the Content are licensed, not sold or transferred to you, 
            and {{company_name}} and its licensors retain ownership of all copies of the {{company_name}} 
            software applications and Content even after installation on your Devices
        </v-card-text>
        <v-card-subtitle class="px-0">{{company_name}}'s Proprietary Rights</v-card-subtitle>
        <v-card-text class="px-0">
            The {{company_name}} Service and the Content are the property of {{company_name}} or {{company_name}}'s licensors. 
            All {{company_name}} trademarks, service marks, trade names, logos, domain names, and any other features 
            of the {{company_name}} brand ("{{company_name}} Brand Features") are the sole property of {{company_name}} 
            or its licensors. These Terms do not grant you any rights to use any {{company_name}} 
            Brand Features whether for commercial or non-commercial use.
        </v-card-text>
        <v-card-text class="px-0">
            You agree to abide by the {{company_name}} User Guidelines and not to use the {{company_name}} Service, 
            the Content, or any part thereof in any manner not expressly permitted by these Terms.
        </v-card-text>
        <v-card-subtitle class="px-0">Payments and cancellation</v-card-subtitle>
        <v-card-subtitle class="px-0">Billing</v-card-subtitle>
        <v-card-text class="px-0">
            You may purchase a Paid Subscription directly from {{company_name}} paying a subscription fee plus applicable 
            taxes in advance on a monthly basis or some other recurring interval disclosed to you prior 
            to your purchase. Tax rates are calculated based on the information you provide and the applicable rate 
            at the time of your monthly charge.
        </v-card-text>
        <v-card-subtitle class="px-0">Price and tax changes</v-card-subtitle>
        <v-card-text class="px-0">
            {{company_name}} may from time to time make changes to Paid Subscriptions, including recurring 
            subscription fees, the Pre-Paid Period (for periods not yet paid), or Codes, and will 
            communicate any price changes to you in advance. Price changes will take effect at the 
            start of the next subscription period following the date of the price change and, by 
            continuing to use the {{company_name}} Service after the price change takes effect, you will have 
            accepted the new price. If you do not agree to a price change, you can reject the change by 
            unsubscribing from the applicable Paid Subscription prior to the price change going into effect.
        </v-card-text>
        <v-card-text class="px-0">
            Tax rates are based on the rates applicable at the time of your monthly charge. 
            These amounts can change over time with local tax requirements in your country, state, 
            territory, county, or city. Any change in tax rate will be automatically applied based 
            on the account information you provide.
        </v-card-text>
        <v-card-subtitle class="px-0">Renewal and Cancellation</v-card-subtitle>
        <v-card-text class="px-0">
            With the exception of Paid Subscriptions for a Pre-Paid Period, your payment to 
            {{company_name}} or the third party through which you purchased the Paid Subscription will 
            automatically renew at the end of the applicable subscription period, unless you cancel 
            your Paid Subscription before the end of the then-current subscription period. Contact 
            our Customer Support team here for instructions on how to cancel. The cancellation will 
            take effect the day after the last day of the current subscription period, and you will 
            be downgraded to the free version of the {{company_name}} Service. We do not provide refunds or 
            credits for any partial subscription periods, except as expressly stated in these Terms.
        </v-card-text>
        <v-card-text class="px-0">
            If you have purchased a Paid Subscription using a Code, your subscription will 
            automatically terminate at the end of the period stated with your Code, or when 
            there is an insufficient pre-paid balance to pay for the {{company_name}} Service.
        </v-card-text>
        <v-card-subtitle class="px-0">Brand accounts</v-card-subtitle>
        <v-card-text class="px-0">
            If you establish a {{company_name}} account on behalf of a company, organization, entity, 
            or brand (a "Brand," and such account a "Brand Account"), the terms "you" and "your," 
            as used throughout these Terms (including other {{company_name}} terms and conditions 
            incorporated by reference herein), apply to both you and the Brand.
        </v-card-text>
        <v-card-text class="px-0">
            If you create a Brand Account, you represent and warrant that you are authorized 
            to grant all permissions and licenses provided in these Terms 
            (including any other applicable {{company_name}} terms and conditions) 
            and to bind the Brand to these Terms.
        </v-card-text>
        <v-card-text class="px-0">
            A Brand may follow users and create and share playlists, provided that the 
            Brand does not take any action that implies an endorsement or commercial 
            relationship between the Brand and the followed user, artist, songwriter, or any 
            other person, unless the Brand has independently obtained the rights to imply such an endorsement. 
            In addition, Brands must be transparent to our users about disclosing any 
            endorsements or consideration provided to artists, songwriters, users, or any other party 
            and must comply with all applicable laws, regulations, and codes of practice 
            when engaging in the foregoing practices.
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>

const config = useRuntimeConfig()
const company_name = ref<string>(`${config.public.COMPANY_NAME}`)
const title = ref<string>(`3.  Your Use of the ${config.public.SITE_NAME} Service`)

</script>