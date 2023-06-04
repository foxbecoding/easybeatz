<template>
    <div id="about">   
        <v-lazy
            v-for="(data, i) in aboutData" 
            :key="i"
            :min-height="550"
            :options="{'threshold':1}"
            transition="slide-x-transition"
        >
            <v-container class="px-0 my-4">
                <div v-if="$vuetify.display.xs" class="content-img-container mx-auto">
                    <v-img :src="data.imageSrc" cover  class="rounded-xl w-100"/>
                </div>
                <div class="py-4">
                    <h1>
                        <span class="title-highlight">{{ data.title }}</span>
                    </h1>
                    <p class="text-section my-4">
                        {{ data.text }}
                    </p>
                </div>
                <div v-if="$vuetify.display.smAndUp" class="content-img-container mx-auto">
                    <v-img :src="data.imageSrc" cover  class="rounded-xl w-100"/>
                </div>
            </v-container>
        </v-lazy>
    </div>
</template>
    
<script lang="ts" setup>
const aboutData = useAboutUs().aboutData
</script>
<style scoped>

#about .title-highlight {
    background: repeating-linear-gradient(to right, #3fabf3, #283593);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

#about .content-img-container{
    width: 100%; 
    max-width: 370px; 
    height: 200px;
    z-index: 1 !important;
}

#about .text-section {
    font-size: 1.25rem;
    line-height: 1.8rem;
    z-index: 1 !important;
    position: relative;
}

</style>