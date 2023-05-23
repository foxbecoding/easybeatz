export interface Genre {
    pk: string|number
    genre: string
    og_genre: string
    subgenres: string[]|number[] 
    beats: string[]|number[]
}

export interface Subgenre {
    pk: string|number
    genre: string|number
    subgenre: string
    og_subgenre: string
    beats: string[]|number[]
}