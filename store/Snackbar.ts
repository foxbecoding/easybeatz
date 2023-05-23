export const useSnackbar = defineStore("snackbar", () => {
    //state
    const show = ref<boolean>(false)
    const text = ref<string>('')
    
    //actions
    const setSnackbar = (data_text: string, data_show: boolean): void => {
        text.value = data_text
        show.value = data_show
    }

    return { 
        show,
        text,
        setSnackbar
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSnackbar, import.meta.hot));
}