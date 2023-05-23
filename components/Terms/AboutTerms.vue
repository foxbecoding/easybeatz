<template>
    <v-card  flat color="background">
        <v-card-title class="px-0">{{title}}</v-card-title>
        <v-card-text class="px-0">
            Under applicable law, you may have certain rights that can't be limited by a contract. 
            These Terms are in no way intended to restrict those rights.
        </v-card-text>
        <v-card-subtitle class="px-0">Changes</v-card-subtitle>
        <v-card-text class="px-0">
            We may make changes to these Terms (including any additional {{company_name}} terms 
            and conditions incorporated by reference herein) from time to time by notifying 
            you of such changes by any reasonable means, including by posting the revised 
            Terms on the applicable {{company_name}} Service (provided that, for material changes, 
            we will seek to supplement such notice by email, an in-service pop-up message 
            or other prominent notice within the Service, or other means). Any such changes 
            will not apply to any dispute between you and us arising prior to the date on which 
            the Terms were changed. Your use of the {{company_name}} Service following any changes to 
            these Terms will constitute your acceptance of such changes. If you do not wish to 
            continue using the {{company_name}} Service under the updated Terms, you may terminate your 
            account by contacting us. The effective date set forth at the top of this document 
            indicates when these Terms were last changed.
        </v-card-text>
        <v-card-subtitle class="px-0">Entire agreement</v-card-subtitle>
        <v-card-text class="px-0">
            Other than as stated in this section or as explicitly agreed upon in writing between 
            you and {{company_name}}, these Terms constitute all the terms and conditions agreed upon between 
            you and {{company_name}} and supersede any prior agreements in relation to the subject matter of 
            these Terms, whether written or oral.
        </v-card-text>
        <v-card-subtitle class="px-0">Severability and waiver</v-card-subtitle>
        <v-card-text class="px-0">
            Unless as otherwise stated in these Terms, should any provision of these Terms be 
            held invalid or unenforceable for any reason or to any extent, the remaining 
            provisions of these Terms will not be affected, and the application of that provision 
            shall be enforced to the extent permitted by law.
        </v-card-text>
        <v-card-text class="px-0">
            Any failure by {{company_name}} or any third-party beneficiary to enforce these 
            Terms or any provision thereof shall not waive {{company_name}}'s or the applicable 
            third-party beneficiary's right to do so.
        </v-card-text>
        <v-card-subtitle class="px-0">Assignment</v-card-subtitle>
        <v-card-text class="px-0">
            {{company_name}} may assign any or all of these Terms, and may assign or delegate, in whole 
            or in part, any of its rights or obligations under these Terms. You may not assign 
            these Terms, in whole or in part, nor transfer or sub-license your rights under 
            these Terms, to any third party.
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>

const config = useRuntimeConfig()
const company_name = ref<string>(`${config.public.COMPANY_NAME}`)
const title = ref<string>("7.  About These Terms")

</script>