<template>
    <div>
        <AuthForm 
            form-title="Sign in"
            is-email
            is-password
            is-submit-btn
            is-sign-up-link
            is-forgot-link
        />
    </div>
</template>
<script lang="ts" setup>
definePageMeta({
  middleware: ["authentication"]
})

const title = ref<string>(`Sign in`)
const description = ref<string>('Sign in to your account.')
const { seo } = useSEO(title.value, description.value)

useHead(seo)
</script>