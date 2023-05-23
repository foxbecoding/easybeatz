<template>
    <div>
        <AccountTabs />
        <v-container class="pa-4" fluid>
            <h1>My account details</h1>
            <v-card max-width="600" color="background">
                <AccountDetailsForm />
            </v-card>
            <AccountResetPassword />
            <div class="mt-4">
                <v-btn 
                    @click="userStore.isPasswordForm = !userStore.isPasswordForm"
                    class="mr-4"
                    color="primary" 
                    variant="tonal"
                    rounded="xl"
                    :loading="isLoading"
                >
                    Change password
                </v-btn>
                <v-btn 
                    @click="signOut()"
                    color="error" 
                    variant="tonal"
                    rounded="xl"
                    :loading="isLoading"
                >
                    Sign out
                </v-btn>
            </div>
            
        </v-container>
    </div>
</template>
<script lang="ts" setup>
import ApiData from '@/utils/types/ApiData'
import { useUser } from '@/store/User'
import { useSnackbar } from '@/store/Snackbar'

definePageMeta({
  middleware: ["authentication"]
})

const config = useRuntimeConfig()
const userStore = useUser()
const router = useRouter()
const snackbarStore = useSnackbar()
const isLoading = ref<boolean>(false)

const signOut =  async (): Promise<void> => {
    isLoading.value = true
    let apiData: ApiData = {
        path: `${config.public.API_USER_AUTH_SIGN_OUT}`,
        method: 'POST'
    }
    const { data, error } = await useApiPlus(apiData)
    if(error.value){
        console.log(error.value)
        isLoading.value = false
        return
    }
    isLoading.value = false
    router.replace('/beats')
    userStore.resetAuthUserData()
    snackbarStore.setSnackbar('Signed out successfully', true)
}

useHead({ 
    title: () => `Account details - ${config.public.SITE_NAME}`  
})
</script>