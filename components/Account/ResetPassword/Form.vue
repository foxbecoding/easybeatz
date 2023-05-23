<template>
    <div>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="mb-4"
        >
            <div v-for="(field, i) in formFields" :key="i">
                <v-text-field
                    v-if="field.show"
                    :id="field.id"
                    :rules="field.rules"
                    :label="field.label"
                    :type="showPassword ? 'text' : field.type"
                    :disabled="field.disabled"
                    :prepend-inner-icon="field.prependIcon"
                    @update:model-value="updateModelValue(field.id, $event)"
                    @keypress.enter="submit()"
                    v-model="field.model"
                    bg-color="surface"
                    color="primary"
                    variant="outlined"
                    required
                >
                    <template v-slot:append-inner>
                        <v-icon 
                            @click="showPassword = !showPassword"
                            class="show-password-icon" 
                            color="primary"
                            :icon="!showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        />
                    </template>
                </v-text-field>
            </div>
        </v-form>
        <v-alert
            v-model="formError"
            border="start"
            variant="tonal"
            color="error"
            class="mb-4"
        >
            {{ formErrorMsg }}
        </v-alert>
        <v-btn       
            @click="submit()"
            :loading="isLoading"
            color="primary"
            class="text-background"
            rounded="xl"
            flat
            block 
        >
            submit
        </v-btn>
        <v-btn       
            @click="userStore.isPasswordForm = false"
            :disabled="isLoading"
            color="error"
            class="text-background mt-2"
            rounded="xl"
            variant="tonal"
            block 
        >
            close
        </v-btn>
    </div>
</template>

<script lang="ts" setup>
import ApiData from '@/utils/types/ApiData'
import { FormField } from '@/utils/types/FormFields'
import { useUser } from '@/store/User'
import { useSnackbar } from '@/store/Snackbar'

const config = useRuntimeConfig()
const userStore = useUser()
const router = useRouter()
const form = ref()
const formError = ref<boolean>(false)
const formErrorMsg = ref<boolean>(false)
const valid = ref<boolean>(true)
const showPassword = ref<boolean>(false)
const isLoading = ref<boolean>(false) 
const snackbar = useSnackbar()
const newPassword =  ref<string>('')
const newPasswordRules = ref([
    (v: any) => !! v || 'New password is required',
])
const confirmPassword =  ref<string>('')
const confirmPasswordRules = ref([
    (v: any) => !! v || 'Confirm password is required',
])

const formFields = ref<FormField[]>([
    {
        id: '1', 
        show: true, 
        model: newPassword.value, 
        rules: newPasswordRules.value, 
        label: 'New password',  
        name: 'new-password',
        type: 'password',
        disabled: false,
        prependIcon: 'mdi-lock'
    },
    {
        id: '2', 
        show: true, 
        model: confirmPassword.value, 
        rules: confirmPasswordRules.value, 
        label: 'Confirm password',
        name: 'confirm-password',
        type: 'password',
        disabled: false,
        prependIcon: 'mdi-lock'
    }
])

const updateModelValue = (id: string, e: any): void => {
    switch(id) {
        case formFields.value.find(x => x.name == 'new-password')?.id:
            newPassword.value = e
            break;
        case formFields.value.find(x => x.name == 'confirm-password')?.id:
            confirmPassword.value = e
            break;
        default:
            // code block
    }
}

const submit = async (): Promise<void> => {
    isLoading.value = true
    const isValid: boolean = await useValidateForm(form.value)
    if(!isValid) { isLoading.value = false; return; }
    
    let apiData: ApiData = {
            path: `${config.public.API_USER_CHANGE_PASSWORD}${userStore.user.pk}/`,
            method: 'PATCH',
            data: { 
                new_password: newPassword.value, 
                confirm_password: confirmPassword.value 
            }
        }

        const { data, error } = await useApiPlus(apiData)

        if(error.value) {
            formError.value = true
            formErrorMsg.value = error.value
            isLoading.value = false
            return 
        }
        if(data.value.password_error){
            formError.value = true
            formErrorMsg.value = data.value.password_error
            isLoading.value = false
            return
        }
        
        isLoading.value = false
        userStore.isPasswordForm = false
        userStore.resetAuthUserData()
        router.replace('/auth/sign-in')
        snackbar.setSnackbar('Password changed', true)
}

</script>