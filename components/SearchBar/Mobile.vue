<template>
    <v-dialog
      v-model="DIALOG"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
        <v-card color="background">
            <v-toolbar
                color="background"
                class="pa-2"
                :height="40"
            >
                <v-card class="w-100" color="background" rounded="xl">
                    <v-text-field 
                        @click:append-inner="submit()"
                        @click:prepend-inner="closeDialog()"
                        @keypress.enter="submit()"
                        :loading="isLoading"
                        append-inner-icon="mdi-magnify"
                        prepend-inner-icon="mdi-arrow-left"
                        clearable
                        class="searchbar"
                        color="primary"
                        bg-color="surface"
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
                </v-card>
            </v-toolbar>
        </v-card>
    </v-dialog>
</template>
<script lang="ts" setup>

const { isLoading, model, submit, searchBeatsStore } = useSearch()

const DIALOG = computed<boolean>((): boolean =>  searchBeatsStore.show_mobile_search)

const closeDialog = (): void => {
    searchBeatsStore.show_mobile_search = false
}

</script>
<style lang="scss" scoped>
.searchbar-container {
    width: 100%;
    position: relative;
    top: 0;
}
</style>