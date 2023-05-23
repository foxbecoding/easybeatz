<template>
    <div>
        <v-btn 
            @click.stop="goToPlaying()"
            class="now-playing-btn"
            variant="text"
            icon
        >
            <v-icon>{{ LOCATION_ICON }}</v-icon>
        </v-btn>
    </div> 
</template>

<script lang="ts" setup>

const { LOCATION_ICON, goToPlaying } = useMusicControls()

</script>

