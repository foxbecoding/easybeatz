<template>
    <v-card 
        flat
        rounded="xl"
        color="transparent"
        class="text-center"
    >
        <v-icon  :size="125" color="warning">
            mdi-poker-chip
        </v-icon>
        <v-card-title>
            My tokens
        </v-card-title>
        <v-card-text>
            <p>Tokens: {{ userStore.is_authenticated ? userStore.user.token_data.tokens : 0 }}</p>
        </v-card-text>
        <p v-if="false" class="text-center">Buy tokens in the token shop</p>
        <v-card-actions>         
            <v-btn 
                @click="tokenDataStore.isOpen = false"
                color="primary" 
                block 
                rounded 
                variant="tonal"
                class="text-background"
                to="/token-shop"
            >
                Buy Tokens
                <template v-slot:append>
                    <v-icon color="warning">mdi-poker-chip</v-icon>
                </template>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
    
<script lang="ts" setup>
import { useUser } from '@/store/User'
import { useTokenData } from '@/store/TokenData'

const tokenDataStore = useTokenData()
const userStore = useUser()

</script>
<style scoped>

</style>