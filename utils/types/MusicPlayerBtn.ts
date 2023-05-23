import { DisplayInstance, DisplayThresholds } from 'vuetify'

interface MusicPlayerBtn {
    id: number
    name?: string
    show?: any
    icon: string
    color?: string
    variant?: string
    tooltipText?: string
    tooltipActivator?: string
    tooltipLocation?: string
    clickHandler?: Function
}

export default MusicPlayerBtn