<template>
    <div>
        <v-expansion-panels variant="inset">
            <v-expansion-panel
                v-for="(faq, i) in faqStore.faqs"
                :key="i"
                :title="faq.question"
                :text="faq.answer"
            >
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script lang="ts" setup>
import { useFAQS } from '@/store/FAQ'

const faqStore = useFAQS()

</script>