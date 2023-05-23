<template>
    <v-card 
        class="mx-auto pa-4" 
        flat 
        color="background" 
        max-width="400"
    >
        <v-card-title v-if="props.formTitle" class="px-0">
            {{ props.formTitle }}
        </v-card-title>
        <v-card-subtitle v-if="props.formSubtitle" class="mb-3 px-0">
            {{ props.formSubtitle }}
        </v-card-subtitle>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <div v-for="(field, i) in formFields" :key="i">
                <v-text-field
                    v-if="field.show"
                    density="compact"
                    :id="field.id"
                    :rules="field.rules"
                    :label="`${field.label}*`"
                    :type="field.type"
                    :prepend-inner-icon="field.prependIcon"
                    @update:model-value="updateModelValue(field.id, $event)"
                    @keypress.enter="submit()"
                    v-model="field.model"
                    color="primary"
                    bg-color="surface"
                    required
                >
                    <template 
                        v-if="field.id == '3' || field.id == '4'" 
                        v-slot:append-inner
                    >
                        <v-icon 
                            @click="togglePassword(field.id)"
                            class="show-password-icon" 
                            color="primary"
                            :icon="field.appendIcon"
                        />
                    </template>
                </v-text-field>
            </div>
            <v-checkbox
                v-if="props.isCheckbox"
                v-model="checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                color="primary"
                required
            >
            <template v-slot:label>
                <div>
                    By clicking this checkbox you agree to our 
                    <nuxt-link 
                        to="/terms" 
                        class="text-primary text-decoration-none">
                            terms
                    </nuxt-link>
                    of use.
                </div>
            </template>
            </v-checkbox>
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
        <v-alert
            v-model="isForgotPasswordMessage"
            border="start"
            variant="tonal"
            color="success"
            class="mb-4"
        >
            Your new password has been sent to your email.  Please check your email.
        </v-alert>
        <v-btn       
            @click="submit()" 
            class="text-background"
            :loading="isLoading"
            block
            color="primary"
            rounded="xl"
        >
            Submit
        </v-btn>

        <v-container class="px-0 py-4">
            <div v-for="ah in authHelpers">
                <p v-if="ah.show">
                    {{ ah.text }}
                    <nuxt-link 
                        class="text-primary text-decoration-none"
                        :to="`${ah.to}`" 
                    >
                    {{ ah.linkLabel }}
                    </nuxt-link>
                </p>
            </div>
        </v-container>
    </v-card>    
</template>

<script lang="ts" setup>
import ApiData from '@/utils/types/ApiData'
import { FormField } from '@/utils/types/FormFields'
import { useUser } from '@/store/User'

interface AuthHelper {
    show: Boolean,
    text: String,
    to: String,
    linkLabel: String
}

const props = defineProps({
    isFullname: Boolean,
    isEmail: Boolean,
    isPassword: Boolean,
    isConfirmPassword: Boolean,
    isCheckbox: Boolean,
    isSubmitBtn: Boolean,
    isSignInLink: Boolean,
    isSignUpLink: Boolean,
    isForgotLink: Boolean,
    formTitle: String,
    formSubtitle: String
})

const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()
const userStore = useUser()
const form = ref()
const formError = ref<boolean>(false)
const formErrorMsg = ref<boolean>(false)
const isForgotPasswordMessage = ref<boolean>(false)
const valid = ref<boolean>(true)
const checkbox = ref<boolean>(false)
const isShowPassword = ref<boolean>(false)
const isLoading = ref<boolean>(false) 
const fullname =  ref<string>('')
const fullnameRules = ref([
    (v: any) => !! v || 'Name is required',
])
const password =  ref<string>('')
const confirmPassword =  ref<string>('')
const passwordRules = ref([
    (v: any) => !! v || 'Password is required',
])
const email = ref<string>('')
const emailRules = ref([
    (v: any) => !! v || 'E-mail is required',
    (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
])

const formFields = ref<FormField[]>([
    {
        id: '1', 
        show: props.isEmail, 
        model: email.value, 
        rules: emailRules.value, 
        label: 'E-mail',  
        type: 'text',
        prependIcon: 'mdi-email'
    },
    {
        id: '2', 
        show: props.isFullname, 
        model: fullname.value, 
        rules: fullnameRules.value, 
        label: 'Fullname',
        type: 'text',
        prependIcon: 'mdi-account'
    },
    {
        id: '3', 
        show: props.isPassword, 
        model: password.value, 
        rules: passwordRules.value, 
        label: 'Password',  
        type: 'password',
        prependIcon: 'mdi-lock',
        appendIcon: 'mdi-eye'
    },
    {
        id: '4', 
        show: props.isConfirmPassword, 
        model: confirmPassword.value, 
        rules: passwordRules.value, 
        label: 'Confirm Password',  
        type: 'password',
        prependIcon: 'mdi-lock',
        appendIcon: 'mdi-eye'
    }
])

const SIGN_IN_PATH = computed<string>(
    () =>  route.query.redirect ? `/auth/sign-in?redirect=${route.query.redirect}` : "/auth/sign-in"
)

const SIGN_UP_PATH = computed<string>(
    () =>  route.query.redirect ? `/auth/sign-up?redirect=${route.query.redirect}` : "/auth/sign-up"
)

const authHelpers = ref<AuthHelper[]>([
    {
        show: props.isSignInLink, 
        text: 'Have an account?', 
        to: `${SIGN_IN_PATH.value}`, 
        linkLabel: 'Sign in'
    },
    {
        show: props.isSignUpLink, 
        text: "Don't Have an account?", 
        to: `${SIGN_UP_PATH.value}`, 
        linkLabel: 'Sign up'
    },
    {
        show: props.isForgotLink, 
        text: 'Forgot your password?', 
        to: '/auth/forgot-password', 
        linkLabel: 'Yes, I forgot'
    }
])

//methods
const togglePassword = (id: string): void => {
    isShowPassword.value = !isShowPassword.value
    let field = formFields.value.find(e => e.id === id) as FormField
    field.type = isShowPassword.value ? 'text' : 'password'
    field.appendIcon = !isShowPassword.value ? 'mdi-eye' : 'mdi-eye-off'
}

const submit =  (): void => {
    isLoading.value = true
    if(route.name == 'auth-sign-in'){
        loginSubmit()
    }else if(route.name == 'auth-sign-up'){
        signUpSubmit()
    }else if(route.name == 'auth-forgot-password'){
        forgotPasswordSubmit()
    }
}

const loginSubmit = async (): Promise<void> => {
    const isValid: boolean = await useValidateForm(form.value)
    if(!isValid) {isLoading.value = false; return;}
    
    let apiData: ApiData = {
        path: `${config.public.API_USER_AUTH_SIGN_IN}`,
        method: 'POST',
        data: { email: email.value, password: password.value }
    }

    const { data, error } = await useApiPlus(apiData)

    if(error.value) {
        formError.value = true
        formErrorMsg.value = error.value
        isLoading.value = false
        return 
    }

    if(data.value.access_denied){
        formError.value = true
        formErrorMsg.value = data.value.access_denied[0]
        isLoading.value = false
        return 
    }

    formError.value = false
    userStore.setAuthUserData(data.value, true)
    isLoading.value = false
    useGetBeats().enhanceBeats()
    if(route.query.redirect){
        router.replace(`/${route.query.redirect}`)
        return    
    }
    router.replace('/account')
}

const signUpSubmit = async (): Promise<void> => {
    const isValid: boolean = await useValidateForm(form.value)
    if(!isValid) { isLoading.value = false; return; }
    
    let apiData: ApiData = {
        path: `${config.public.API_USER_AUTH_SIGN_UP}`,
        method: 'POST',
        data: {
            email: email.value, 
            fullname: fullname.value,
            password: password.value,
            confirm_password: confirmPassword.value,
            agreed_to_toa: checkbox.value
        }
    }
    
    const { data, error } = await useApiPlus(apiData)

    if(data.value.error){
        formError.value = true
        formErrorMsg.value = data.value.error[0]
        isLoading.value = false
        return 
    }
    
    if(error.value) {
        formError.value = true
        formErrorMsg.value = error.value
        isLoading.value = false
        return 
    }
    
    formError.value = false
    userStore.setAuthUserData(data.value, true)
    isLoading.value = false
    if(route.query.redirect){
        router.replace(`/${route.query.redirect}`)
        return    
    }
    router.replace('/account')
}

const forgotPasswordSubmit = async (): Promise<void> => {
    const isValid: boolean = await useValidateForm(form.value)
    if(!isValid) { isLoading.value = false; return; }
    
    let apiData: ApiData = {
        path: `${config.public.API_USER_AUTH_FORGOT_PASSWORD}`,
        method: 'POST',
        data: { email: email.value}
    }

    const { data, error } = await useApiPlus(apiData)

    if(error.value) {
        formError.value = true
        formErrorMsg.value = error.value
        isLoading.value = false
        return 
    }

    formError.value = false
    isLoading.value = false
    isForgotPasswordMessage.value = true
}

const updateModelValue = (id: string, e: any): void => {
    switch(id) {
        case '1':
            email.value = e
            break;
        case '2':
            fullname.value = e
            break;
        case '3':
            password.value = e
            break;
        case '4':
            confirmPassword.value = e
            break;
        default:
            // code block
    }
}
</script>
<style scoped>
.show-password-icon:hover {
    cursor: pointer;
}
</style>