<template>
    <v-card class="searchbar-container" rounded="xl" flat>
        <v-text-field
            @click:append-inner="submit()"
            @keypress.enter="submit()"
            :loading="isLoading"
            append-inner-icon="mdi-magnify"
            clearable
            class="searchbar rounded-xl"
            color="primary"
            density="compact"
            hide-details
            placeholder="Search for beats"
            single-line
            v-model="model"
            variant="solo"
        >
            <template v-slot:prepend-inner>
                <img v-if="!isLoading" src="/logo-icon.png" width="24"/>
                <EasyLoader v-else style="width: 30px"/>
            </template>
        </v-text-field>
        <v-menu
            v-if="false"
            activator="parent"
            offset="5"
        >
            <v-list rounded="xl">
                <v-list-item
                    v-for="(item, index) in 5"
                    :key="index"
                    :value="index"
                >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-card>
</template>
<script lang="ts" setup>

const { isLoading, model, submit } = useSearch()

</script>
<style lang="scss" scoped>
.searchbar-container {
    width: 100%;
    max-width: 400px;
    position: relative;
    top: 0;
}

.v-field{
    border-radius: 24px !important;
}

</style>