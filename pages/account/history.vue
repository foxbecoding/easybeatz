<template>
    <div>
        <AccountTabs />
        <v-container class="pa-0" fluid>
            <v-row no-gutters>
                <v-col cols="12">
                    <h1 class="px-4 pt-4 pb-1">My history</h1>
                </v-col>
                <v-col cols="12" md="8" lg="8" xl="8">
                    <Beats :beats="playedBeats"/>
                </v-col>
            </v-row>
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
const playedBeats =  useGetBeats(user.played_beats).found_beats.value

useHead({ 
    title: () => `History - ${config.public.SITE_NAME}`
})
</script>