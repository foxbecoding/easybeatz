export const useSEO =  (title: string, description: string) => {
    const config = useRuntimeConfig()
    const route = useRoute()
    const url = ref<string>(`${config.public.BASE_URL+route.fullPath}`) 
    const seo = reactive(
        { 
            title: () => title,
            meta: [
                { 
                    hid: 'description', 
                    property: 'description', 
                    content: description
                },
                { 
                    hid: 'og:site_name', 
                    property: 'og:site_name', 
                    content: config.public.SITE_NAME
                },
                { 
                    hid: 'og:url', 
                    property: 'og:url', 
                    content: () => url.value
                },
                { 
                    hid: 'og:type', 
                    property: 'og:type', 
                    content: 'website' 
                },
                { 
                    hid: 'og:title', 
                    property: 'og:title', 
                    content: `${title} - ${config.public.SITE_NAME}`
                },
                { 
                    hid: 'og:description', 
                    property: 'og:description', 
                    content: description 
                },
                { 
                    hid: 'og:image', 
                    property: 'og:image', 
                    content: `${config.public.BASE_URL}/album-icon.png` 
                },
                { 
                    hid: 'og:image:secure_url', 
                    property: 'og:image:secure_url', 
                    content: `${config.public.BASE_URL}/album-icon.png` 
                },
                { 
                    hid: 'og:image:alt', 
                    property: 'og:image:alt', 
                    content: `${config.public.SITE_NAME} logo`  
                },
                { 
                    hid: 'twitter:card', 
                    name: 'twitter:card', 
                    content: 'summary_large_image' 
                },
                { 
                    hid: 'twitter:url', 
                    name: 'twitter:url', 
                    content: () => url.value 
                },
                { 
                    hid: 'twitter:title', 
                    name: 'twitter:title', 
                    content: `${title} - ${config.public.SITE_NAME}`
                },
                { 
                    hid: 'twitter:description', 
                    name: 'twitter:description', 
                    content: description
                },
                { 
                    hid: 'twitter:image', 
                    name: 'twitter:image', 
                    content: `${config.public.BASE_URL}/album-icon.png` 
                },
                { 
                    hid: 'twitter:image:alt', 
                    name: 'twitter:image:alt', 
                    content: `${title} - ${config.public.SITE_NAME}`
                },
                { 
                    hid: 'twitter:site', 
                    name: 'twitter:site', 
                    content: `@${config.public.SITE_NAME}`
                },
            ]
        } 
    )
    return { seo }
}