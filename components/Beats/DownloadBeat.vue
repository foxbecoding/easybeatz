<template>
    <v-dialog
        v-if="beatDownloadStore.dialog"
        v-model="beatDownloadStore.dialog"
        persistent
        width="auto"
        scrim="#515151"
    >
        <v-card 
            v-if="!beatDownloadStore.isProcessing"
            color="surface" 
            max-width="300" 
            rounded="xl"
        >
            <v-card-title class="text-wrap">
                Choose a file
            </v-card-title>
            <v-radio-group v-model="selected">
                <v-divider />
                <div v-for="(option, i) in downloadOptions" :key="i">
                    <v-radio 
                        :label="option.label" 
                        :value="option.id" 
                        color="primary"
                        density="comfortable"
                    />
                    <v-divider />
                </div>
            </v-radio-group>
            <v-card-actions class="my-0">
                <v-btn 
                    @click="close()"
                    variant="plain"
                    color="primary"
                    rounded="xl"
                >close</v-btn>
                <v-btn 
                    v-if="selected"
                    @click="downloadBeat(beatDownloadStore.beat, selected)"
                    variant="plain"
                    color="primary"
                    rounded="xl"
                >submit</v-btn>
                <v-btn 
                    v-else
                    variant="plain"
                    color="text-surface"
                    rounded="xl"
                    :disabled="true"
                >submit</v-btn>
            </v-card-actions>
        </v-card>
        <v-card 
            v-else
            color="surface" 
            max-width="300" 
            rounded="xl"
        >
            <v-alert 
                class="mx-4 mt-4"
                text="Processing for stems may take 3-5 minutes" 
                variant="tonal"
                color="warning"
                border="start"
                density="compact"
            />
            <div class="d-block ma-4" >
                <h3>Processing please wait...</h3>
                <v-progress-linear
                    color="primary"
                    indeterminate
                    rounded
                    height="6"
                />
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { useBeatDownload } from '~/store/Beats'

const selected = ref()
const beatDownloadStore = useBeatDownload()
const { 
        downloadOptions,
        downloadBeat
    } = useBeatMethods()

const close = (): void => {
    beatDownloadStore.dialog = false
    selected.value = undefined
}

</script>