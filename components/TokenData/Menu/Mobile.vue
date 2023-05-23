<template>
    <div>
        <ActionSheet 
            v-model="tokenDataStore.isOpen" 
            fullscreen
            isCloseBtn
            :maxHeight="100"
            :start-height="100"
            isScrim
            scrim="#282828"
            rounded="xl"
        >
          <TokenData />
        </ActionSheet>
    </div>
</template>
<script lang="ts" setup>
import { useTokenData } from '@/store/TokenData'

const tokenDataStore = useTokenData()

</script>