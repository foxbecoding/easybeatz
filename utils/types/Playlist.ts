export interface Playlist {
    pk: string|number
    title: string
    slug: string
    description: string
    image: string
    beats: array
    is_active: boolean
}