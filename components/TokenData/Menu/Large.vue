<template>
    <v-menu 
        v-model="tokenDataStore.isOpen"
        width="250" 
        location="top right"
        location-strategy="connected"
        transition="scale-transition"
        style="position: fixed !important; top: 15px; left: calc(100% - 265px) !important;"
    >
        <v-list>
            <TokenData />
        </v-list>
    </v-menu>
</template>
<script lang="ts" setup>
import { useTokenData } from '@/store/TokenData'

const tokenDataStore = useTokenData()

</script>