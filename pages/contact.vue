<template>
    <div>
        <v-container
            class="py-4" 
            :class="$vuetify.display.mdAndUp ? 'px-4' : 'px-0'"
            fluid
        >
            <v-card 
                class="mx-auto"
                color="background" 
                max-width="400" 
                flat 
            >
                <v-card-title>Contact Us</v-card-title>
                <v-card-subtitle class="text-wrap">
                    Please send us your inquiry and we will respond within 1-3 business days.
                </v-card-subtitle>
                <v-card-text>
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                        <v-text-field
                            density="compact"
                            :rules="emailRules"
                            label="E-mail*"
                            type="text"
                            prepend-inner-icon="mdi-email-outline"
                            @keypress.enter="submit()"
                            v-model="formFields.email"
                            color="primary"
                            bg-color="surface"
                            required
                        />
                        <v-text-field
                            density="compact"
                            :rules="nameRules"
                            label="Name*"
                            type="text"
                            prepend-inner-icon="mdi-account-outline"
                            @keypress.enter="submit()"
                            v-model="formFields.name"
                            color="primary"
                            bg-color="surface"
                            required
                        />
                        <v-textarea
                            density="compact"
                            :rules="messageRules"
                            label="Message*"
                            type="text"
                            prepend-inner-icon="mdi-message-outline"
                            @keypress.enter="submit()"
                            v-model="formFields.message"
                            color="primary"
                            bg-color="surface"
                            required
                        />
                        
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn 
                        @click="submit()"
                        :loading="isLoading"
                        color="primary text-background"
                        rounded="xl"
                        variant="flat"
                        block
                    >
                        Submit
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </div>
</template>
<script lang="ts" setup>
import ApiData from '@/utils/types/ApiData'
import { useSnackbar } from '@/store/Snackbar'

interface FormField {
    email: string
    name: string
    message: string
}

const config = useRuntimeConfig()
const title = ref<string>('Contact')
const description = ref<string>('Contact us with your inquiry and we will respond within 1-3 business days')
const { seo } = useSEO(title.value, description.value)
const snackbar = useSnackbar()
const formFields = reactive<FormField>({
    email: '',
    name: '',
    message: ''
})

const nameRules = ref([
    (v: any) => !! v || 'Name is required',
])

const emailRules = ref([
    (v: any) => !! v || 'E-mail is required',
    (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
])

const messageRules = ref([
    (v: any) => !! v || 'Message is required',
])

const form = ref()
const valid = ref<boolean>(true)
const isLoading = ref<boolean>(false)


const submit = async (): Promise<void> => {
    isLoading.value = true
    const isValid: boolean = await useValidateForm(form.value)
    if(!isValid) { isLoading.value = false; return; }
    let formdata: FormField = {
        email: formFields.email,
        name: formFields.name,
        message: formFields.message,
    }
    
    let apiData: ApiData = {
        path: `${config.public.API_USER_CONTACT_US}`,
        method: 'POST',
        data: formdata
    }

    const { data, error } = await useApiPlus(apiData)

    if(error.value) {
        isLoading.value = false
        return 
    }

    isLoading.value = false
    form.value.reset()
    snackbar.setSnackbar('Message sent!', true)
}

useHead(seo)

</script>