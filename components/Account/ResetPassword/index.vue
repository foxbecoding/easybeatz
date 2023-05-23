<template>
    <div>
        <AccountResetPasswordLargeForm v-if="$vuetify.display.mdAndUp"/>
        <AccountResetPasswordMobileForm  v-else/>
    </div>
</template>

<script lang="ts" setup>
</script>