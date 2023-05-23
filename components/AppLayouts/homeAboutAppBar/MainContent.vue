<template>
    <div>
        <div class="app-nav-bar" v-if="$vuetify.display.mdAndUp">
            <v-btn v-if="$route.name != 'about'" to="/about" >
                About
            </v-btn>
            <v-btn  to="/pricing" >
                Pricing
            </v-btn>
            <v-btn  to="/faq" >
                Faq
            </v-btn>
            <v-btn  to="/beats">
                Beats
            </v-btn>
        </div>
    </div>
</template>
    
<script lang="ts" setup>

</script>
<style scoped>
.app-nav-bar{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>