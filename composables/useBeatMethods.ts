import ApiData from '@/utils/types/ApiData'
import { Beat } from '@/utils/types/Beats'
import { useExploreBeats, useBeatMenu, useBeatDownload } from '@/store/Beats'
import { useCart } from '@/store/Cart'
import { useUser } from '@/store/User'
import { useSnackbar } from '@/store/Snackbar'

export const useBeatMethods = () => {
    interface ActionBtn {
        id: number
        name: string
        icon: string
        color: string
        tooltipText?: string, 
        tooltipActivator?: string, 
    }

    interface DownloadOption {
        id: number,
        name: string
        label: string
        ext: '.mp3'|'.wav'
    } 
    const config = useRuntimeConfig()
    const router = useRouter()
    const beatsStore = useExploreBeats()
    const beatMenuStore = useBeatMenu()
    const beatDownloadStore = useBeatDownload()
    const cartStore = useCart()
    const snackbarStore = useSnackbar()
    const userStore = useUser()
    const actions = ref<ActionBtn[]>([
        {
            id: 1, 
            name: "options", 
            icon: 'mdi-dots-horizontal-circle-outline', 
            color: 'grey-lighten-1',
            tooltipText: 'Beat details', 
            tooltipActivator: 'parent',
        },
        {
            id: 2, 
            name: "heart",  
            icon: 'mdi-heart-outline', 
            color: 'grey-lighten-1',
            tooltipText: 'Add to wishlist', 
            tooltipActivator: 'parent', 
        },
        {
            id: 3, 
            name: "cart",  
            icon: 'mdi-cart-plus', 
            color: 'primary',
            tooltipText: 'Add to cart', 
            tooltipActivator: 'parent',  
        },
    ])

    const downloadOptions = ref<DownloadOption[]>([
        { id: 1, name: 'mp3', label: 'MP3', ext: '.mp3' },
        { id: 2, name: 'wav', label: 'WAV', ext: '.wav' },
        // { id: 3, name: 'mp3-stems', label: 'MP3 Stems', ext: '.mp3' },
        // { id: 4, name: 'wav-stems', label: 'WAV Stems', ext: '.wav' },
    ])

    const addToCart = (beat: Beat): void => {
        let found = cartStore.cart.find(x => x.pk == beat.pk)
        if (!found){ 
            cartStore.cart.push(beat)
            snackbarStore.setSnackbar('Beat added to cart!', true)
            return 
        }
        snackbarStore.setSnackbar('Beat already added to cart', true)
        return 
    }

    const removeFromCart = (beat: Beat): void => {
        let index = cartStore.cart.findIndex(x => x.pk == beat.pk)
        cartStore.cart.splice(index, 1)
        snackbarStore.setSnackbar('Beat removed from cart', true)
    }

    const downloadBeat = async (beat: Beat, option_id: number): Promise<void> => {
        const BASE_URL = config.public.BASE_URL
        const USER_BEATS_LIBRARY = config.public.USER_BEATS_LIBRARY
        const USER_LIBRARY = userStore.user.pk_alt+'-library/'
        const LINK = document.createElement('a')
        
        let downloadOption = downloadOptions.value.find(x => x.id === option_id)
        beatDownloadStore.isProcessing = true
        
        if(downloadOption?.name === 'mp3'){
            setTimeout(() => {
                let link_path = `${BASE_URL+USER_BEATS_LIBRARY+USER_LIBRARY+beat.beat_file.replace('beats/', '')}`
                LINK.href = link_path
                LINK.download = beat.beat_title+' prod. by '+beat.user.og_username+` easybeatz.com${downloadOption?.ext}`
                LINK.click()
                URL.revokeObjectURL(LINK.href) 
                beatDownloadStore.isProcessing = false
            }, 3000) 
            return
        }else if(downloadOption?.name === 'wav'){
            let apiData: ApiData = {
                data: { beat: beat.pk, user: userStore.user.pk },
                method: 'POST',
                path: `${config.public.API_DOWNLOAD_BEAT}`
            }
    
            const { data, error } = await useApiPlus(apiData)

            if(error.value){
                console.log(error.value)
                beatDownloadStore.isProcessing = false
                return
            }

            if(data){
                let link_path = `${BASE_URL+USER_BEATS_LIBRARY+USER_LIBRARY+data.value.file}`
                LINK.href = link_path
                LINK.download = beat.beat_title+' prod. by '+beat.user.og_username+` easybeatz.com${downloadOption?.ext}`
                LINK.click()
                URL.revokeObjectURL(LINK.href) 
                let apiDeleteData: ApiData = {
                    data: { file_path: data.value.file_path },
                    method: 'DELETE',
                    path: `${config.public.API_DOWNLOAD_BEAT}0/`
                }
        
                await useApiPlus(apiDeleteData)
            }
            beatDownloadStore.isProcessing = false
            return
        }else{
            let apiData: ApiData = {
                data: { 
                    beat: beat.pk, 
                    user: userStore.user.pk,  
                    codec: downloadOption?.name === 'mp3-stems' ? 'mp3' : 'wav'
                },
                method: 'POST',
                path: `${config.public.API_DOWNLOAD_STEMS}`
            }

            const { data, error } = await useApiPlus(apiData)

            if(error.value){
                console.log(error.value)
                beatDownloadStore.isProcessing = false
                return
            }

            if(data){
                let link_path = `${BASE_URL+USER_BEATS_LIBRARY+USER_LIBRARY+data.value.file}.zip`
                LINK.href = link_path
                LINK.download = `${downloadOption?.name}-`+beat.beat_title+' prod. by '+beat.user.og_username+` easybeatz.com.zip`
                LINK.click()
                URL.revokeObjectURL(LINK.href) 
                let apiDeleteData: ApiData = {
                    data: { file_path: data.value.file_path },
                    method: 'DELETE',
                    path: `${config.public.API_DOWNLOAD_STEMS}0/`
                }
                setTimeout(async () => {
                    await useApiPlus(apiDeleteData)
                },3000)
            }
            beatDownloadStore.isProcessing = false
            return
        }
    }

    const heartBeat = (pk: string): void => {
        if(userStore.is_authenticated){
            let found_beat = beatsStore.explore_beats.find(x => x.pk == pk)
            if(found_beat){ 
                
                found_beat.is_favorite = !found_beat.is_favorite
                found_beat.is_favorite ? userStore.user.favorite_beats.push(pk) : userStore.user.favorite_beats.pop()
                
                let data: ApiData = {
                    data: { beat: found_beat.pk, user: userStore.user.pk },
                    method: 'POST',
                    path: `${config.public.API_FAVORITE_BEATS}`
                }

                if (found_beat.is_favorite){
                    useApiPlus(data)
                    snackbarStore.setSnackbar('Beat added to wishlist', true)
                }else{
                    userStore.user.favorite_beats.pop()
                    data.method = 'DELETE'
                    useApiPlus(data) 
                    snackbarStore.setSnackbar('Beat removed from wishlist', true)
                }  
                     
            }
            return 
        }
        router.push('/auth/sign-in')
    }

    const setCartIcon = (btn: ActionBtn, beat: Beat) => {
        if(beat.is_purchased){
            return 'mdi-tray-arrow-down'
        }

        return cartStore.cart.includes(beat) ? 'mdi-cart-minus' : btn.icon
    }

    const setButtonIcon = (btn: ActionBtn, beat: Beat): string => {
        const icon = ref<string>('')
        switch (btn.id as number) {
            case 1:
                icon.value = btn.icon
                break;
            case 2:
                btn.tooltipText = beat.is_favorite ? 'Remove from wishlist' : 'Add to wishlist'
                icon.value = beat.is_favorite ? 'mdi-heart' : btn.icon
                break;
            case 3:
                icon.value = setCartIcon(btn, beat)
                break;
            default:
                icon.value = btn.icon
                break;
        }
        return icon.value
    }

    const cartActionHandler = (beat: Beat): void => {
        if(userStore.is_authenticated && beat.is_purchased){ 
            useBeatDownload().dialog = true
            return
        }

        cartStore.cart.includes(beat) ? removeFromCart(beat) : addToCart(beat)
    }

    const actionHandler = (btnId: number, beat: Beat): void => {
        useBeatDownload().beat = beat
        switch (btnId) {
            case 1:
                beatMenuStore.openOptionsMenu(beat)
                break;
            case 2:
                heartBeat(beat.pk)
                break;
            case 3:
                cartActionHandler(beat)
                break;
            default:
                break;
        }
    }

    const setTooltip = (btn: ActionBtn, beat: Beat) => {
        if(btn.id === 3){
            if(beat.is_purchased){
                return 'Download beat'
            }
    
            return cartStore.cart.includes(beat) ? 'Remove from cart' : 'Add to cart'
        }

        return btn.tooltipText
        
    }
    
    return { 
        actions,
        downloadOptions,
        addToCart,
        removeFromCart,
        heartBeat,
        downloadBeat,
        setButtonIcon,
        setTooltip,
        actionHandler
    }
}