export const useValidateForm = async (form: any): Promise<boolean> => {
    const { valid } = await form.validate()
    return valid
}