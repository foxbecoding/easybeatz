<template>
    <div>
        <AccountTabs /> 
        <v-container
            :class="$vuetify.display.mdAndUp ? 'px-4' : 'px-0'"
            fluid
        >
            <BeatsListTitle :class="$vuetify.display.mdAndUp ? 'mx-0' : 'mx-4'">
                My beat purchases
            </BeatsListTitle>
            <Beats :beats="purchasedBeats" :key="purchasedBeats.length"/>
        </v-container>      
    </div>
</template>
<script lang="ts" setup>
import { useUser } from '@/store/User'
definePageMeta({
  middleware: ["authentication"]
})

const config = useRuntimeConfig()
const userStore = useUser()
const user = userStore.user
const purchasedBeats =  useGetBeats(user.purchased_beats).found_beats.value

useHead({ 
    title: () => `Beat purchases - ${config.public.SITE_NAME}` 
})
</script>