<template>
</template>

<script lang="ts" setup>
import { usePlaylists } from "@/store/Playlist"
import { Playlist } from "@/utils/types/Playlist"

const playlistStore = usePlaylists()
const playlist = ref<Playlist>(playlistStore.playlists[0])
if(playlist.value){
    useRouter().push(`/playlists/${playlist.value.slug}`)
}
</script>