<template>
    <div>
        <AccountTabs />
        <v-container
            :class="$vuetify.display.mdAndUp ? 'px-4' : 'px-0'"
            fluid
        >
            <BeatsListTitle :class="$vuetify.display.mdAndUp ? 'mx-0' : 'mx-4'">
                My wishlist
            </BeatsListTitle>
            <Beats :beats="favoriteBeats" :key="favoriteBeats.length"/>
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
const favoriteBeats = useGetBeats(user.favorite_beats).found_beats.value

useHead({ 
    title: () =>  `My wishlist - ${config.public.SITE_NAME}`
})
</script>