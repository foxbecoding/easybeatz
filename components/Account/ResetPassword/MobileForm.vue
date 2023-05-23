<template>
    <div>  
        <ActionSheet
            v-model="user.isPasswordForm" 
            fullscreen
            isCloseBtn
            :maxHeight="95"
            :startHeight="100"
            title="Change password"
            isScrim
            scrim="#282828"
            rounded="xl"
        >
            <template v-slot:topContent>
                <v-alert
                    border="start"
                    variant="tonal"
                    color="warning"
                    class="mx-4"
                >
                    By changing your password you will have to sign-in again.
                </v-alert>
            </template>
            <v-container>            
                <AccountResetPasswordForm />
            </v-container>
        </ActionSheet>
    </div>
</template>

<script lang="ts" setup>
import { useUser } from '@/store/User'

const user = useUser()
</script>