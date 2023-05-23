<template>
    <div>
        <SocialMedia />
        <div v-if="$vuetify.display.mdAndUp">
            <NuxtLink  
                class="pr-1 aux-links text-primary" 
                v-for="link in auxLinks" :to="link.to">
                {{link.title}}
            </NuxtLink>
        </div>
        <p class="legal-content">&copy{{company_name}} {{ new Date().getFullYear() }}
        ALL RIGHTS RESERVED</p>
    </div>
</template>
    
<script lang="ts" setup>
import LinkList from '@/utils/types/LinkList'

const config = useRuntimeConfig()
const router = useRouter()
const company_name = ref<string>(`${config.public.COMPANY_NAME}`)
const auxLinks = ref<LinkList[]> ([
    { title: 'About', to: '/about' },
    { title: 'Contact', to: '/contact' },
    { title: 'FAQ', to: '/faq' },
    // { title: 'How it works', to: '/how-it-works' },
    // { title: 'Blog', to: '/blog' },
    { title: 'Terms', to: '/terms' },
    { title: 'Privacy', to: '/privacy' },
])

const goToSocial = (social: 'twitter'|'instagram'): void => {
    if (social === 'instagram'){
        window.location.assign('https://instagram.com/easybeatzdotcom')
        return
    }
    window.location.assign('https://twitter.com/easybeatzdotcom')
}

</script>
<style scoped>
.aux-links {
    text-decoration: none;
    font-size: 0.8rem;
    opacity: 0.8;
}
.aux-links:hover {
    opacity: 0.65;
}

.legal-content {
    font-size: 0.8rem;
    opacity: 0.8;
}
</style>