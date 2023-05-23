// https://v3.nuxtjs.org/api/configuration/nuxt.config
// import qs from 'qs'
const title = 'EasyBeatz'
const description = `Explore our catalog of instrumentals and find the perfect beat for your next song, video or podcast.`
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            BASE_URL: process.env.BASE_URL,
            USER_BEATS_LIBRARY: process.env.USER_BEATS_LIBRARY,
            API_BASE_URL: process.env.API_BASE_URL,
            API_DOWNLOAD_BEAT: process.env.API_DOWNLOAD_BEAT,
            API_DOWNLOAD_STEMS: process.env.API_DOWNLOAD_STEMS,
            API_EXPLORE_BEATS: process.env.API_EXPLORE_BEATS,
            API_FAQS: process.env.API_FAQS,
            API_FAVORITE_BEATS: process.env.API_FAVORITE_BEATS,
            API_GENRES: process.env.API_GENRES,
            API_HASHTAGS: process.env.API_HASHTAGS,
            API_PLAYLISTS: process.env.API_PLAYLISTS,
            API_PRICE_PACKAGES: process.env.API_PRICE_PACKAGES,
            API_PRODUCERS: process.env.API_PRODUCERS,
            API_SEARCH_BEATS: process.env.API_SEARCH_BEATS,
            API_SIMILAR_BEATS: process.env.API_SIMILAR_BEATS,
            API_CANCEL_STRIPE_SUBSCRIPTION: process.env.API_CANCEL_STRIPE_SUBSCRIPTION,
            API_COMPLETE_STRIPE_SUBSCRIPTION: process.env.API_COMPLETE_STRIPE_SUBSCRIPTION,
            API_STRIPE_SUBSCRIPTION: process.env.API_STRIPE_SUBSCRIPTION,
            API_TOKEN_PURCHASES: process.env.API_TOKEN_PURCHASES,
            API_TOKEN_SHOP: process.env.API_TOKEN_SHOP,
            API_TOKEN_SHOP_COMPLETE: process.env.API_TOKEN_SHOP_COMPLETE,
            API_USER_AUTH_SIGN_IN: process.env.API_USER_AUTH_SIGN_IN,
            API_USER_AUTH_SIGN_UP: process.env.API_USER_AUTH_SIGN_UP,
            API_USER_AUTH_SIGN_OUT: process.env.API_USER_AUTH_SIGN_OUT,
            API_USER_AUTH_FORGOT_PASSWORD: process.env.API_USER_AUTH_FORGOT_PASSWORD,
            API_USER_BILLING_INFO: process.env.API_USER_BILLING_INFO,
            API_USER_EDIT_DETAILS: process.env.API_USER_EDIT_DETAILS,
            API_USER_CHANGE_PASSWORD: process.env.API_USER_CHANGE_PASSWORD,
            API_USER_CONTACT_US: process.env.API_USER_CONTACT_US,
            API_USER_SESSION: process.env.API_USER_SESSION,
            COMPANY_NAME: process.env.COMPANY_NAME,
            SITE_NAME: process.env.SITE_NAME,
            SITE_DOMAIN: process.env.SITE_DOMAIN,
            STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY
        },
        private: {
            // STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY
        }
    },
    app: {    
        layoutTransition: { name: 'slide' },
        head: { 
            title: title,
            titleTemplate: `%s - ${process.env.SITE_NAME}`,
            htmlAttrs: {
                lang: 'en'
            },
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { 
                    hid: 'description', 
                    property: 'description', 
                    content: description
                },
                { 
                    hid: 'og:site_name', 
                    property: 'og:site_name', 
                    content: process.env.SITE_NAME 
                },
                { 
                    hid: 'og:url', 
                    property: 'og:url', 
                    content: `https://${process.env.SITE_DOMAIN}` 
                },
                { 
                    hid: 'og:type', 
                    property: 'og:type', 
                    content: 'website' 
                },
                { 
                    hid: 'og:title', 
                    property: 'og:title', 
                    content: title 
                },
                { 
                    hid: 'og:description', 
                    property: 'og:description', 
                    content: description 
                },
                { 
                    hid: 'og:image', 
                    property: 'og:image', 
                    content: `${process.env.BASE_URL}/album-icon.png` 
                },
                { 
                    hid: 'og:image:secure_url', 
                    property: 'og:image:secure_url', 
                    content: `${process.env.BASE_URL}/album-icon.png` 
                },
                { 
                    hid: 'og:image:alt', 
                    property: 'og:image:alt', 
                    content: `${process.env.SITE_NAME } logo` 
                },
                { 
                    hid: 'twitter:card', 
                    name: 'twitter:card', 
                    content: 'summary_large_image' 
                },
                { 
                    hid: 'twitter:url', 
                    name: 'twitter:url', 
                    content: process.env.BASE_URL 
                },
                { 
                    hid: 'twitter:title', 
                    name: 'twitter:title', 
                    content: title
                },
                { 
                    hid: 'twitter:description', 
                    name: 'twitter:description', 
                    content: description
                },
                { 
                    hid: 'twitter:image', 
                    name: 'twitter:image', 
                    content: `${process.env.BASE_URL}/album-icon.png` 
                },
                { 
                    hid: 'twitter:image:alt', 
                    name: 'twitter:image:alt', 
                    content: title
                },
                { 
                    hid: 'twitter:site', 
                    name: 'twitter:site', 
                    content: `@${process.env.SITE_NAME }`
                },
                { 
                    name:"google-site-verification", 
                    content:"F4lh686rR8EYuGG7jaoPj663-TS97C90miHVJfCZZtk" 
                }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ]   
        }
    },
    css: [
        'vuetify/lib/styles/main.sass', 
        '@mdi/font/css/materialdesignicons.min.css',
        'assets/styles.scss'
    ],
    build: {
        transpile: ['vuetify'],
    },
    vite: {
        define: {
            'process.env.DEBUG': false,
        }
    },
    modules: [
        [
            '@pinia/nuxt',
            {
                autoImports: [
                    'defineStore',
                    'acceptHMRUpdate',
                ],
            },
        ]
    ]
})