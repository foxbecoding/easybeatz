<template>
    <div>
        <AuthForm 
            form-title="Forgot password?"
            is-email
            is-submit-btn
            is-sign-in-link
        />
    </div>
</template>
<script lang="ts" setup>
definePageMeta({
  middleware: ["authentication"]
})

const title = ref<string>('Forgot password')
const description = ref<string>('Forgot password.')
const { seo } = useSEO(title.value, description.value)

useHead(seo)
</script>