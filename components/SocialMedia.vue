<template>
    <div class="text-center">
        <v-btn 
            v-for="(media, i) in socialMedia"
            :key="media.id"
            @click="goToSocial(media.name)"
            class="mr-4" 
            variant="tonal" 
            color="primary"
            size="small" 
            icon
        >
            <v-icon size="large">{{ media.icon }}</v-icon>
        </v-btn>
    </div>
</template>
    
<script lang="ts" setup>
interface SocialMedia {
    id: number
    name: 'twitter'|'instagram'
    icon: string
}

const socialMedia = ref<SocialMedia[]>([
    {id: 1, name: 'instagram', icon: 'mdi-instagram'},
    {id: 2, name: 'twitter', icon: 'mdi-twitter'}
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

</style>