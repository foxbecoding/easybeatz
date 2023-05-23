<template>
    <div>   
        <div class="easy-glow"></div>       
        <v-row v-if="$vuetify.display.mdAndUp" align="center" style="height: 300px;">
            <v-col>
                <h1 class="title-section text-h4">
                    {{ title }}
                </h1>
                <p class="text-section my-2">
                    {{ textSection }}
                </p>
                <v-btn 
                    @click="$router.push('/pricing')" 
                    variant="flat" 
                    class="mt-6 rounded-xl text-background" 
                    color="primary"
                >
                    Get Started
                </v-btn>
            </v-col>
            <v-col>
                <EasyLoader class="easy-wave"/>
            </v-col>
        </v-row>
        <div v-else>
            <div class="d-flex flex-column">
                <div class="my-1">
                    <EasyLoader class="easy-wave"/>
                </div>
                <div class="my-4">
                    <h1 class="title-section">
                        {{ title }}
                    </h1>
                    <p class="text-section my-2">
                        {{ textSection }}
                    </p>
                </div>
                <div class="my-4">
                    <v-btn 
                        @click="$router.push('/pricing')"
                        class="rounded-xl text-background" 
                        color="primary">Get Started
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script lang="ts" setup>

const config = useRuntimeConfig() 
const title = ref<string>(`What is ${config.public.SITE_NAME}`)
const textSection = ref<string>(`${config.public.SITE_NAME} is an online subscription service that provides access to high quality intrumentals at an affordable cost.`)

</script>
<style scoped>
.easy-glow {
    background: repeating-linear-gradient(to right, #3fabf3 0%, #03A9F4 50%, #00BCD4 100%);
    opacity: 0.5;
    height: 300px;
    width: 300px;
    filter: blur(140px);
    position: absolute;
    right: 0;
    -webkit-backface-visibility: hidden;
    -webkit-perspective: 1000;
    -webkit-transform: translate3d(0,0,0);
    -webkit-transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000;
    transform: translate3d(0,0,0);
    transform: translateZ(0);
}

.caption-highlight {
    background: repeating-linear-gradient(to right, #3fabf3, #283593);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.title-section{
    z-index: 1 !important;
    position: relative;
}
.text-section {
    font-size: 1.35rem;
    line-height: 1.8rem;
    z-index: 1 !important;
    position: relative;
}
</style>