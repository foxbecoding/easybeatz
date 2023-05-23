export interface FormField {
    id: string
    show?: boolean
    model: string
    rules?: any[]
    label?: string
    type?: string
    name?: string
    disabled?: boolean
    prependIcon?: string
    appendIcon?: string
}