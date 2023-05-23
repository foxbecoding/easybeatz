<template>
    <div class="d-flex">
        <v-card 
            v-for="(pl, i) in playlistStore.playlists"
            :key="i"
            color="transparent"
            class="mr-4"
            flat
        >          
            <v-img 
                class="rounded-xl card-content"
                aspect-ratio="4/3"
                cover 
                width="260px"
                height="160px"
                :alt="pl.title"
                :src="`/media/${pl.image}`" 
                v-ripple
                @click="$router.push(`/playlists/${pl.slug}`)"
            />
            
            <v-card-title class="py-0 text-subtitle-1">
                {{ pl.title }}
            </v-card-title>
        </v-card>
    </div>
</template>

<script lang="ts" setup>
import { usePlaylists } from '@/store/Playlist'

const playlistStore = usePlaylists()

</script>
<style scoped>
.card-content:hover{
    cursor: pointer;
}
</style>