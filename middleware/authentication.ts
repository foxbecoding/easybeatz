import { useUser } from '@/store/User'

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useUser()
    const isAccountPage = (routeName: string): boolean => {
      return routeName.includes('account') ? true : false
    }
    if (!store.is_authenticated && isAccountPage(String(to.name))) {
      return navigateTo('/auth/sign-in')
    }else if(store.is_authenticated && (to.name == 'auth-sign-in' || to.name == 'auth-forgot-password')){
      return navigateTo('/account')
    }
});
  