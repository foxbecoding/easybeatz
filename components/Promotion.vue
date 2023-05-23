<template>
    <div>
        <v-alert
            v-if="$route.name != 'beats'"
            v-model="alert"
            border="start"
            border-color="primary"
            color="surface"
            elevation="2"
            rounded="lg"
            class="text-center"
        >
            Limited time only! Receive a <strong>free token</strong> 
            <v-icon color="warning" class="ml-2">mdi-poker-chip</v-icon>  
            (<strong>free beat</strong>) when you sign up for our Premium, Elite, or VIP plans.
        </v-alert>
        <v-alert 
            v-else
            v-model="alert"
            border="start"
            border-color="primary"
            color="surface"
            elevation="2"
            rounded="lg"
            class="d-block"
            title="Limited time only! "
        >
            <v-btn
                @click="alert = !alert"
                style="position: absolute; top: 14px; right: 0;"
                color="transparent" 
                icon="mdi-close" 
                size="x-small"
                flat 
            />
            <p class="mb-4">Sign up and get a free beat</p>
            <v-btn 
                color="primary text-surface" 
                variant="flat"
                rounded="xl" 
                :block="$vuetify.display.mdAndUp" 
                to="/pricing"
            >
                Learn more
            </v-btn>
        </v-alert>
    </div>
</template>

<script lang="ts" setup>
import { useUser } from '@/store/User'

const alert = ref<boolean>(true)
const config = useRuntimeConfig()
const router = useRouter()
const userStore = useUser()
onMounted(() => {
    if(userStore.is_authenticated && ('billing_info' in userStore.user)){
        if(userStore.user.billing_info.subscription_status == 'active'){
            alert.value = false
        }
    }
})
</script>