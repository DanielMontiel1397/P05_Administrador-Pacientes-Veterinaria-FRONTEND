import { StateCreator } from "zustand"
import { NuevoPasswordParamsType, PerfilVeterinarioFormulario, Veterinario, VeterinarioAuth, VeterinarioCambiarPassword, VeterinarioLogin } from "../types"
import { registrarVeterinario, loginVeterinario, obtenerPerfil, confirmarCuenta, editarPerfil, cambiarPassword, olvidePassword, comprobarToken, nuevoPassword } from "../services/authService"
import { type AlertaFormularioSliceType } from "./alertaFormularioSlice"
import { PacienteSliceType } from "./pacientesSlice"



export type AuthSliceType = {
    auth: VeterinarioAuth
    registrarVeterinario: (veterinario: Veterinario) => Promise<void>
    loginVeterinario: (Veterinario: VeterinarioLogin) => Promise<boolean>
    obtenerPerfil: () => Promise<void>
    editarPerfil: (veterinario: PerfilVeterinarioFormulario) => Promise<void>
    confirmarCuenta: (id: string | undefined) => Promise<boolean>
    cambiarPassword: (passwords: VeterinarioCambiarPassword) => Promise<void>
    olvidePassword: (email: string) => Promise<void>
    comprobarToken: (token: string | undefined) => Promise<boolean>
    nuevoPassword: (params: NuevoPasswordParamsType) => Promise<boolean> 
    cerrarSesion: () => void
    loading: boolean
}

const estadoInicialAuth: VeterinarioAuth = {
    nombre: '',
    email: '',
    telefono: '',
    web: '',
    _id: '',
    token: ''
}

export const authSlice: StateCreator<AuthSliceType & AlertaFormularioSliceType & PacienteSliceType, [], [], AuthSliceType> = (set, get) => ({
    auth: estadoInicialAuth,

    loading: false,

    registrarVeterinario: async (veterinario) => {

        const respuesta = await registrarVeterinario(veterinario);

        get().mostrarAlerta({
            mensaje: respuesta.mensaje,
            error: respuesta.success
        })

    },

    loginVeterinario: async (veterinario) => {
        const respuesta = await loginVeterinario(veterinario);

        //Si el Log es correcto Autenticamos al usuario
        if (respuesta.success) {
            set({
                auth: respuesta.data
            });
            localStorage.setItem('token', respuesta.data.token);
            return true;
        } else {

            get().mostrarAlerta({
                mensaje: respuesta.mensaje,
                error: !respuesta.success
            })
            return false;
        }

    },

    confirmarCuenta: async (id) => {

        set({
            loading: true
        })

        try {
            const respuesta = await confirmarCuenta(id);

            get().mostrarAlerta({
                mensaje: respuesta.mensaje,
                error: !respuesta.success
            })
            set({
                loading: false
            })

            return respuesta.success

        } catch (error) {
            set({
                loading: false
            })
            get().mostrarAlerta({
                mensaje: 'Error inesperado al eliminar el paciente',
                error: true
            })
            return false
        }


    },

    obtenerPerfil: async () => {

        set({
            loading: true
        })

        const token = localStorage.getItem('token');

        //si no existe token reseteamos auth.
        if (!token) {
            set({
                auth: estadoInicialAuth,
                loading: false
            });

            return;
        }

        try {

            const respuesta = await obtenerPerfil()

            if (respuesta.success) {
                set({
                    auth: {
                        ...respuesta.data,
                        token: token
                    },
                    loading: false
                });
                return;
            }

            set({
                auth: estadoInicialAuth,
                loading: false
            });

            localStorage.removeItem('token')

        } catch (error) {

            set({
                auth: estadoInicialAuth,
                loading: false
            });
            localStorage.removeItem('token')

        }

    },

    editarPerfil: async (veterinario) => {

        try {
            const respuesta = await editarPerfil(veterinario);

            if (respuesta.success) {
                set({
                    auth: {
                        ...respuesta.data,
                        token: get().auth.token
                    }
                })

            }

            get().mostrarAlerta({
                mensaje: respuesta.mensaje,
                error: !respuesta.success
            })

        } catch (error) {
            get().mostrarAlerta({
                mensaje: 'Error inesperado al actualizar al veterinario',
                error: true
            })
        }

    },

    cambiarPassword: async (passwords) => {

        try {
            const respuesta = await cambiarPassword(passwords);


            get().mostrarAlerta({
                mensaje: respuesta.mensaje,
                error: !respuesta.success
            })

        } catch (error) {
            get().mostrarAlerta({
                mensaje: 'Error inesperado al Cambiar la Contraseña',
                error: true
            })
        }

    },

    olvidePassword: async (email) => {

        try {
            const respuesta = await olvidePassword(email);

            get().mostrarAlerta({
                mensaje: respuesta.mensaje,
                error: !respuesta.success
            })
        } catch (error) {
            get().mostrarAlerta({
                mensaje: 'Error inesperado al recuperar la contraseña',
                error: true
            })
        }

    },

    comprobarToken: async (token) => {

        try {
            const respuesta = await comprobarToken(token)

            get().mostrarAlerta({
                mensaje: respuesta.mensaje,
                error: !respuesta.success
            })

            return respuesta.success;
        } catch (error) {

            get().mostrarAlerta({
                mensaje: 'Error inesperado al Comprobar el Token',
                error: true
            })
            return false

        }

    },

    nuevoPassword: async (params) => {

        try {
            const respuesta = await nuevoPassword(params);
            get().mostrarAlerta({
                mensaje: respuesta.mensaje,
                error: !respuesta.success
            })

            return respuesta.success;
        } catch (error) {
            get().mostrarAlerta({
                mensaje: 'Error inesperado al Crear Nueva Contraseña',
                error: true
            })
            return false
        }

    },

    cerrarSesion: () => {
        localStorage.removeItem('token');
        set({
            auth: estadoInicialAuth
        })
    }
})