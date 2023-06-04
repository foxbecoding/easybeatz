<template>
    <v-toolbar-title>
        <v-img 
        class="logo-img" 
        @click="$router.push('/')"  
        src="/logo.png" 
        :width="!$vuetify.display.xs ? 134 : 90"
    />
    </v-toolbar-title>
</template>
    
<script lang="ts" setup>


</script>
<style scoped>
.logo-img:hover{
    cursor: pointer;
}
</style>