<template>
    <div>
        <AuthForm 
            form-title="Sign up"
            form-subtitle="Sign up for free and enjoy all of our features."
            is-email
            is-fullname
            is-password
            is-confirm-password
            is-checkbox
            is-submit-btn
            is-sign-in-link
        />
    </div>
</template>
<script lang="ts" setup>
definePageMeta({
  middleware: ["authentication"]
})

const title = ref<string>(`Sign up`)
const description = ref<string>('Sign up for free and enjoy all of our features.')
const { seo } = useSEO(title.value, description.value)

useHead(seo)

</script>