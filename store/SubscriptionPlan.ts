export const useSubscriptionPlan = defineStore("subscription-plan", () => {
    
    //state
    const pricePackage_pk = ref<any>()
    const client_secret = ref(null)

    return {
        client_secret,
        pricePackage_pk
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSubscriptionPlan, import.meta.hot));
}