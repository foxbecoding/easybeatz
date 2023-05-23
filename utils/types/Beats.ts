export interface Beat {
    beat_duration: string
    beat_duration_secs: number
    beat_bpm: number
    beat_file: string
    beat_seo: string
    beat_title: string
    beat_title_slug: string
    is_active: boolean
    is_purchased: boolean
    is_favorite: boolean
    genre: {
        genre: string
        og_genre: string 
        pk: string
    }
    hashtags: [{
        pk: string
        tag: string
    }]
    pk: string
    subgenre: {
        genre: string
        og_subgenre: string 
        pk: string
        subgenre: string 
    }
    user: {
        og_username: string,
        pk: string,
        username: string
    }
}
