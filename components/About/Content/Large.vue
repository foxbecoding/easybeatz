<template>
    <div id="about">   
        <v-lazy
            v-for="(data, i) in aboutData" 
            :key="i"
            :min-height="400"
            :options="{'threshold':1}"
            transition="slide-x-transition"
        >
            <div class="d-flex justify-space-between ma-4">
                <div 
                    v-if="data.name == 'video'"
                    class="content-img-container w-50" 
                    :class="data.imageClass"
                >
                    <v-img :src="data.imageSrc" cover  class="rounded-xl w-100"/>
                </div>
                <div :class="data.textClass" class="w-50">
                    <h1 class="text-h3">
                        <span class="title-highlight">{{ data.title }}</span>
                    </h1>
                    <p  class="text-section my-4">
                        {{ data.text }}
                    </p>
                </div>
                <div 
                    v-if="data.name != 'video'"
                    class="content-img-container w-50" 
                    :class="data.imageClass"
                >
                    <v-img :src="data.imageSrc" cover  class="rounded-xl w-100"/>
                </div>
            </div>
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
    max-width: 500px;
    height: 265px;
    z-index: 1 !important;
}

#about .text-section {
    font-size: 1.35rem;
    line-height: 1.8rem;
    z-index: 1 !important;
    position: relative;
}

</style>