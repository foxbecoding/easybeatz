<template>
    <div class="d-flex">
        <v-card 
            v-for="(promo, i) in promos"
            :key="promo.id"
            color="transparent"
            class="mr-4"
            flat
        >          
            <v-img 
                class="rounded-xl card-content"
                aspect-ratio="4/3"
                cover 
                width="260px"
                height="160px"
                :alt="promo.title"
                :src="`/media/content/${promo.src}`" 
                v-ripple
                @click="clickHandler(promo.name)"
            >
                <v-icon 
                    v-if="promo.name === 'ig-promo'" 
                    size="70"
                    class="ig-icon"
                >
                    mdi-instagram
                </v-icon>
            </v-img>
            <v-card-title class="py-0 text-subtitle-1 text-wrap" style="max-width: 260px; line-height: 1.5rem">
                {{ promo.title }}
            </v-card-title>
        </v-card>
    </div>
</template>

<script lang="ts" setup>

interface Promo{
    id: number
    name: string
    src: string
    title: string
}

const router = useRouter()
const promos = ref<Promo[]>(
    [
        {id: 1, name: 'sign-up-promo', src: 'tokens-bg.png', title: 'Sign up for a free token(beat)'},
        {id: 2, name: 'ig-promo', src: 'ig-bg.png', title: 'Visit our IG for our free token(beat) giveaway'},
    ]
)

const clickHandler = (promo_name: string): void => {
    if(promo_name === 'ig-promo'){
        window.location.assign('https://instagram.com/easybeatzdotcom')
        return
    }
    router.push('/pricing')
}

</script>
<style scoped>
.card-content:hover{
    cursor: pointer;
}

.ig-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

</style>