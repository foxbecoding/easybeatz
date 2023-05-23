<template>
    <div>
        <v-btn 
            v-for="(btn, i) in actions" 
            :key="btn.id"
            @click.stop="actionHandler(btn.id, musicPlayerStore.beat)"
            icon
            variant="text"
            :color="btn.id == 2 && musicPlayerStore.beat.is_favorite ?  `error`: `${btn.color}`"
        >
            <v-icon>{{ setButtonIcon(btn, musicPlayerStore.beat) }}</v-icon>
            <v-tooltip
                v-if="$vuetify.display.mdAndUp"
                :activator="btn.tooltipActivator"
                :text="setTooltip(btn, musicPlayerStore.beat)"
                location="top" 
            />
        </v-btn>
    </div>
</template>

<script lang="ts" setup>
import { useMusicPlayer } from '@/store/MusicPlayer'

const musicPlayerStore = useMusicPlayer()
const { 
        actions,
        setButtonIcon,
        setTooltip,
        actionHandler
    } = useBeatMethods()
</script>