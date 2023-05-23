<template>
    <div>
        <AboutContentLarge v-if="$vuetify.display.mdAndUp" />   
        <AboutContentMobile v-else />   
    </div>
</template>
    
<script lang="ts" setup>

</script>
<style scoped>
</style>