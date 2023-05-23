<template>
    <v-card  flat color="background">
        <v-card-title class="px-0">{{title}}</v-card-title>
        <v-card-subtitle class="px-0">User Content</v-card-subtitle>
        <v-card-subtitle class="px-0">The content you post on the {{company_name}} Service</v-card-subtitle>
        <v-card-text class="px-0">
            {{company_name}} users may post, upload, or otherwise contribute content to the {{company_name}} Service 
            ("User Content"). For the avoidance of doubt, "User Content" includes all information,
             materials and other content that is added, created, uploaded, submitted, distributed, or 
             posted to the {{company_name}} Service by users.
        </v-card-text>
        <v-card-text class="px-0">
            You are solely responsible for all User Content that you post.
        </v-card-text>
        <v-card-text class="px-0">
            You promise that, with respect to any User Content you post on {{company_name}}, (1) you own or have 
            the right to post such User Content; and (2) such User Content, or its use by {{company_name}} pursuant 
            to the license granted below, does not: (i) violate these Terms, including the {{company_name}} User 
            Guidelines, applicable law, or the intellectual property or other rights of any third party; or 
            (ii) imply any affiliation with or endorsement of you or your User Content by {{company_name}} or any producer, 
            artist, band, label, or other individual or entity without the prior express written 
            consent from {{company_name}} or such individual or entity.
        </v-card-text>
        <v-card-text class="px-0">
            In posting or sharing User Content or other information on the {{company_name}} Service, please keep 
            in mind that content and other information will be publicly accessible, and may be used and 
            re-shared by others on the {{company_name}} Service and across the web, so please use caution in posting 
            or sharing on the {{company_name}} Service, and be mindful of your account settings. {{company_name}} 
            is not responsible for what you or others post or share on the {{company_name}} Service.
        </v-card-text>
        <v-card-subtitle class="px-0">Monitoring user content</v-card-subtitle>
        <v-card-text class="px-0">
            {{company_name}} may, but has no obligation to, monitor or review User Content. {{company_name}} 
            reserves the right to remove or disable access to any User Content for any or no reason. 
            {{company_name}} may take these actions without prior notification to you.
        </v-card-text>
        <v-card-subtitle class="px-0">Licenses that you grant to us</v-card-subtitle>
        <v-card-subtitle class="px-0">User Content</v-card-subtitle>
        <v-card-text class="px-0">
            You retain ownership of your User Content when you post it to the {{company_name}} Service. 
            However, in order for us to make your User Content available on the {{company_name}} Service, 
            we do need a limited license from you to that User Content. Accordingly, you hereby grant 
            to {{company_name}} a non-exclusive, transferable, sub-licensable, royalty-free, fully paid, 
            irrevocable, worldwide license to reproduce, make available, perform and display, 
            translate, modify, create derivative works from, distribute, and otherwise use any 
            such User Content through any medium, whether alone or in combination with other 
            Content or materials, in any manner and by any means, method or technology, whether 
            now known or hereafter created, in connection with the {{company_name}} Service. Where applicable 
            and to the extent permitted under applicable law, you also agree to waive, and not to 
            enforce, any "moral rights" or equivalent rights, such as your right to be identified as 
            the author of any User Content, including Feedback, and your right to object to derogatory 
            treatment of such User Content.
        </v-card-text>
        <v-card-subtitle class="px-0">Feedback</v-card-subtitle>
        <v-card-text class="px-0">
            If you provide ideas, suggestions, or other feedback in connection with your use of the 
            {{company_name}} Service or any Content ("Feedback"), such Feedback is not confidential 
            and may be used by {{company_name}} without restriction and without payment to you. 
            Feedback is considered a type of User Content under these Terms.
        </v-card-text>
        <v-card-subtitle class="px-0">Your Device</v-card-subtitle>
        <v-card-text class="px-0">
            You also grant to us the right (1) to allow the {{company_name}} Service to use the processor, 
            bandwidth, and storage hardware on your Device in order to facilitate the operation 
            of the {{company_name}} Service, (2) to provide advertising and other information to you, 
            and (3) to allow our business partners to do the same.
        </v-card-text>
        <v-card-subtitle class="px-0">Content experience</v-card-subtitle>
        <v-card-text class="px-0">
            In any part of the {{company_name}} Service, the Content that you access, including its 
            selection and placement, may be influenced by commercial considerations, including 
            {{company_name}}'s agreements with third parties.
        </v-card-text>
        <v-card-text class="px-0">
            Some Content licensed by, provided to, created by, or otherwise made available by {{company_name}} 
            may incorporate advertising or other promotional messages.
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>

const config = useRuntimeConfig()
const company_name = ref<string>(`${config.public.COMPANY_NAME}`)
const title = ref<string>(`4.  Content and Intellectual Property Rights`)

</script>