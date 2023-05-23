<template>
    <div>  
        <v-dialog
            v-model="user.isPasswordForm"
            persistent
            width="auto"
            scrim="#282828"
        >
            <v-card min-width="400" max-width="600" rounded="xl">
                <v-alert
                    border="start"
                    variant="tonal"
                    color="warning"
                    class="ma-4"
                >
                    By changing your password you will have to sign-in again.
                </v-alert>
                <v-card-title>Change password</v-card-title>
                <v-card-text>
                    <AccountResetPasswordForm />
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts" setup>
import { useUser } from '@/store/User'

const user = useUser()
</script>