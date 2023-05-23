import { User } from '@/utils/types/User'

export const useUser = defineStore("user", () => {
    const user = ref<User>({} as User)
    const is_authenticated = ref<boolean>(false)
    const isPasswordForm = ref<boolean>(false)

    const USER_DATA = computed(() => user.value)
    const IS_AUTH = computed(() => is_authenticated.value)

    const setAuthUserData = (user_data: User, is_auth: boolean): void => {
        user.value = user_data
        is_authenticated.value = is_auth
    }

    const resetAuthUserData = (): void => {
        user.value = {} as User
        is_authenticated.value = false
    }

    return {
        user,
        is_authenticated,
        setAuthUserData,
        resetAuthUserData,
        isPasswordForm,
        USER_DATA,
        IS_AUTH,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot));
}