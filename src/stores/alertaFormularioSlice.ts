import type { StateCreator } from "zustand"
import { Alerta } from "../types"
import { AuthSliceType } from "./authSlice"

export type AlertaFormularioSliceType = {
    alerta: Alerta
    mostrarAlerta: (payload: Pick<Alerta, 'mensaje' | 'error'>) => void
}

export const alertaFormularioSlice : StateCreator<AlertaFormularioSliceType & AuthSliceType, [], [], AlertaFormularioSliceType> = (set) => ({
    alerta: {
        mensaje: '',
        error: false
    },

    mostrarAlerta: (payload) => {
        set({
            alerta: {
                mensaje: payload.mensaje,
                error: payload.error
            }
        });

        /*
        setTimeout(() => {
            set({
                alerta: {
                    mensaje: '',
                    error: false
                }
            })
        },5000)
        */
    }
})