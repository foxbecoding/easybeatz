<template>
    <v-snackbar
        color="surface"
        v-model="snackbarStore.show"
        rounded="pill"
        z-index="2050"
    >
        {{ snackbarStore.text }}

        <template v-slot:actions>
            <v-btn
                rounded="xl"
                color="primary"
                variant="text"
                @click="snackbarStore.show = false"
            >
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script lang="ts" setup>
import { useSnackbar } from '@/store/Snackbar'
const snackbarStore = useSnackbar()
</script>