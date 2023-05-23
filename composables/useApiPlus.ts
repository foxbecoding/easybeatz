import ApiData from '@/utils/types/ApiData'

export const useApiPlus = async (apiData: ApiData): Promise<any> => {
    const csrftoken: any = useCookie('csrftoken')
    const requestHeaders = ref<HeadersInit>({
        'accept': 'application/json' ,
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken.value
    })
    if(apiData.isMultiPart){
        requestHeaders.value = {
            'X-CSRFToken': csrftoken.value
        }
    }
    const { data, error } = await useApi(apiData.path,{
        body: apiData.data,
        credentials: 'include',
        headers: requestHeaders,
        method: apiData.method
    })

    return { data, error }
}