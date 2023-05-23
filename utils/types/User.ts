export interface User {
    email: string
    fullname: string
    pk_alt: string
    pk: string|number
    pricePackage: number
    purchased_beats: string[]
    favorite_beats: string[]
    played_beats: string[]
    stripe_cus_id: string
    token_data: {
        tokens: number,
    }
    billing_info: { 
        current_plan: { 
            plan: string, 
            interval: string, 
            amount: number, 
            current_period_end: string 
        },
        payment_methods: [ 
            { 
                pm_id: string, 
                brand: string, 
                last4: string|number, 
                default_method: boolean, 
                expires: string 
            } 
        ], 
        subscription_status: string, 
        cancel_at_period_end: boolean 
    }
}