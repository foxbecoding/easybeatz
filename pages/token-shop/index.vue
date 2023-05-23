<template>
    <div>
        <TokenShop />
    </div>
</template>
<script lang="ts" setup>

const title = ref<string>('Token Shop')
const description = ref<string>('Buy tokens and use them to download any beat.')
const { seo } = useSEO(title.value, description.value)

useHead(seo)

</script>
