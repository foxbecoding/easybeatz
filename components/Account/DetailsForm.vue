<template>
    <div>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <div v-for="(field, i) in formFields" :key="i">
                <v-text-field
                    v-if="field.show"
                    :id="field.id"
                    :rules="field.rules"
                    :label="field.label"
                    :type="field.type"
                    :disabled="field.disabled"
                    :prepend-inner-icon="field.prependIcon"
                    @update:model-value="updateModelValue(field.id, $event)"
                    @keypress.enter="submit()"
                    v-model="field.model"
                    bg-color="surface"
                    color="primary"
                    required
                >
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
            block 
        >
            submit
        </v-btn>
    </div>
</template>

<script lang="ts" setup>
import { FormField } from '@/utils/types/FormFields'
import { useUser } from '@/store/User'
import ApiData from '@/utils/types/ApiData'
import { useSnackbar } from '@/store/Snackbar'

const config = useRuntimeConfig()
const userStore = useUser()
const user = userStore.user
const form = ref()
const formError = ref<boolean>(false)
const formErrorMsg = ref<boolean>(false)
const valid = ref<boolean>(true)
const isLoading = ref<boolean>(false) 
const snackbar = useSnackbar()
const fullname =  ref<string>(user.fullname)
const fullnameRules = ref([
    (v: any) => !! v || 'Name is required',
])
const email = ref<string>(user.email)
const emailRules = ref([
    (v: any) => !! v || 'E-mail is required',
    (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
])

const formFields = ref<FormField[]>([
    {
        id: '1', 
        show: true, 
        model: email.value, 
        rules: emailRules.value, 
        label: 'E-mail',  
        name: 'email',
        type: 'text',
        disabled: true,
        prependIcon: 'mdi-email'
    },
    {
        id: '2', 
        show: true, 
        model: fullname.value, 
        rules: fullnameRules.value, 
        label: 'Fullname',
        name: 'fullname',
        type: 'text',
        disabled: false,
        prependIcon: 'mdi-account'
    }
    
])

const updateModelValue = (id: string, e: any): void => {
    switch(id) {
        case formFields.value.find(x => x.name == 'fullname')?.id:
            fullname.value = e
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
        path: `${config.public.API_USER_EDIT_DETAILS}${userStore.user.pk}/`,
        method: 'PATCH',
        data: { fullname: fullname.value }
    }

    const { data, error } = await useApiPlus(apiData)

    if(error.value) {
        formError.value = true
        formErrorMsg.value = error.value
        isLoading.value = false
        return 
    }
    isLoading.value = false
    userStore.user = data.value
    snackbar.setSnackbar('Details updated', true)
}

</script>