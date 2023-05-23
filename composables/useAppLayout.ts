import LinkList from '@/utils/types/LinkList'
import { useDisplay } from 'vuetify'

export const useAppLayout = () => {
    const route = useRoute()
    const companyLegalName = ref<string>("Easy Beatz LLC")
    const drawer = ref<boolean|any>(true)
    const isRail = ref<boolean|any>(false)
    const navListItems = ref<LinkList[]|any>([
        {
            icon: 'mdi-home-variant',
            title: 'Home',
            route_name: 'index',
            to: '/'
        },
        {
            icon: 'mdi-account-circle',
            title: 'Account',
            route_name: 'account',
            to: '/account'
        },
        {
            icon: 'mdi-cart',
            title: 'Cart',
            route_name: 'cart',
            to: '/cart'
        },
        {
            icon: 'mdi-poker-chip',
            title: 'Token Shop',
            route_name: 'token-shop',
            to: '/token-shop'
        },
        {
            icon: 'mdi-information',
            title: 'Pricing',
            route_name: 'pricing',
            to: '/pricing'
        }
    ])
    const auxLinks = ref<LinkList[]|any> ([
        { title: 'About', to: '/about' },
        { title: 'Contact', to: '/contact' },
        { title: 'How it works', to: '/how-it-works' },
        { title: 'FAQ', to: '/faq' },
        { title: 'Terms', to: '/terms' },
        { title: 'Privacy', to: '/privacy' },
    ])
    const pageYOffset = ref<number>(0)
    const vDisplay = useDisplay()

    const APP_BG_COLOR = computed(() => {
        if(pageYOffset.value <= 40 ){
            return 'app-bar-transparent-bg'
        }
        return 'app-bar-solid-bg'
    })

    const APP_BTNS_COLOR = computed(() => {
        if(pageYOffset.value <= 40 ){
            return 'app-bar-transparent-btn'
        }
        return 'app-bar-solid-btn'
    })

    const SHOW_DESKTOP_SEARCH = computed<boolean>(
        (): boolean => {
            let auth_paths: string[]  = ['auth-sign-in', 'auth-sign-up', 'auth-forgot-password']
            return vDisplay.smAndUp.value && !auth_paths.includes(route.name as string) ? true : false
        } 
    )

    const SHOW_MOBILE_SEARCH = computed<boolean>(
        (): boolean => {
            let auth_paths: string[]  = ['auth-sign-in', 'auth-sign-up', 'auth-forgot-password']
            return vDisplay.xs.value && !auth_paths.includes(route.name as string) ? true : false
        }
    )

    //methods
    const onScroll = (e: any): void => {
        pageYOffset.value = window.pageYOffset
    }

    const openMobileSearch = (): void => {
        useSearch().searchBeatsStore.show_mobile_search = true
    }

    const setPrependIcon = (item: LinkList): any => {
        if(item.route_name === 'token-shop'){ return item.icon; }
        return item.route_name === route.name ? item.icon : `${item.icon}-outline`
    }

    return {
        route,
        companyLegalName,
        drawer,
        isRail,
        navListItems,
        auxLinks,
        pageYOffset,
        vDisplay,
        APP_BG_COLOR,
        APP_BTNS_COLOR,
        SHOW_DESKTOP_SEARCH,
        SHOW_MOBILE_SEARCH,
        onScroll,
        openMobileSearch,
        setPrependIcon
    }
}