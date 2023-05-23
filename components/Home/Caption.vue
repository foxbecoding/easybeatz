<template>
    <div>   
        <div class="easy-glow"></div>       
        <div class="d-flex flex-column text-center">
            <div v-if="$vuetify.display.mdAndUp" class="my-1">
                <EasyLoader class="easy-wave"/>
            </div>
            <div class="my-4 mx-6">
                <h1 class="title-section text-h5 my-2">Find the beat you need</h1>
                <SearchBarDesktop class="mx-auto" />
            </div>
            <div class="my-4 mx-auto" style="max-width: 600px">
                <h1 
                    class="title-section" 
                    :class="$vuetify.display.mdAndUp ? 'text-h3' : 'text-h4'"
                >
                    <span class="title-highlight">{{ title }}</span>    
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
</template>
    
<script lang="ts" setup>

const title = ref<string>(`Unlimited High Quality beats at your finger tips`)
const textSection = ref<string>(`Sign up and enhance your creativity`)

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
    top: -150px;
    -webkit-backface-visibility: hidden;
    -webkit-perspective: 1000;
    -webkit-transform: translate3d(0,0,0);
    -webkit-transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000;
    transform: translate3d(0,0,0);
    transform: translateZ(0);
}

@media screen and (max-width: 959px) {
  .easy-glow{
    top: -200px
  }
}

.title-highlight {
    background: repeating-linear-gradient(to right,  #3fabf3,  #682893);
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