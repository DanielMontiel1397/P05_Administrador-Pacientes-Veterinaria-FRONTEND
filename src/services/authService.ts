import axios from "axios";
import clienteAxios from "../config/axios";
import { CambiarPasswordVeterinarioSchemaResponse, ComprobarTokenSchemaResponse, ConfirmarCuentaSchemaResponse, EditarPerfilSchemaResponse, EditarPerfilSchemaResponseError, LoginErrorSchemaResponse, LoginSucessSchemaResponse, NuevoPasswordSchemaResponse, OlvidePasswordVeterinarioSchemaResponse, PerfilVeterinarioErrorSchemaResponse, PerfilVeterinarioSchemaResponse, RegistroSchemaResponse } from "../schemas/auth-schema";
import { CambiarPasswordVeterinarioType, ComprobarTokenType, ConfirmarCuentaType, EditarPerfilType, LoginResponse, NuevoPasswordParamsType, NuevoPasswordType, ObtenerPerfilResponse, OlvidePasswordVeterinarioType, PerfilVeterinarioFormulario, Veterinario, VeterinarioCambiarPassword, VeterinarioLogin } from "../types";

export async function registrarVeterinario(veterinario: Veterinario) {
    const { email, nombre, password } = veterinario;

    const url = `/veterinarios`

    try {
        const { data } = await clienteAxios.post(url, {
            nombre,
            email,
            password
        });

        const result = RegistroSchemaResponse.safeParse(data);

        if (result.success) {
            return {
                success: false,
                mensaje: result.data.msg
            };
        }

        return {
            success: true,
            mensaje: "Error al procesar la respuesta del servidor"
        }

    } catch (error) {

        if (axios.isAxiosError(error) && error.response) {
            const { data } = error.response;
            const result = RegistroSchemaResponse.safeParse(data);

            if (result.success) {
                return {
                    success: true,
                    mensaje: result.data.msg
                }
            }

            return {
                success: true,
                mensaje: "Error del servidor"
            };

        }

        console.log(error);
        return {
            success: false,
            mensaje: "Error de conexión. Verifica tu internet"
        };
    }
}

export async function loginVeterinario(veterinario: VeterinarioLogin): Promise<LoginResponse> {

    const { email, password } = veterinario;

    const url = '/veterinarios/login';

    try {

        const { data } = await clienteAxios.post(url, {
            email,
            password
        });

        const result = LoginSucessSchemaResponse.safeParse(data);

        if (result.success) {
            return {
                success: true,
                data: result.data.data,
                mensaje: result.data.msg
            };
        }

        return {
            success: false,
            mensaje: "Error al procesar la respuesta del servidor"
        }

    } catch (error) {

        if (axios.isAxiosError(error) && error.response) {
            const { data } = error.response;
            const result = LoginErrorSchemaResponse.safeParse(data);

            if (result.success) {
                return {
                    success: false,
                    mensaje: result.data.msg
                }
            }
            return {
                success: false,
                mensaje: "Error del servidor"
            }

        }

        return {
            success: false,
            mensaje: "Error de conexion. Verifica tu internet"
        }
    }
}

export async function confirmarCuenta(id: string | undefined): Promise<ConfirmarCuentaType> {
    const url = `/veterinarios/confirmar/${id}`;

    try {
        console.log(id);
        const { data } = await clienteAxios.get(url);

        const result = ConfirmarCuentaSchemaResponse.safeParse(data);

        if (result.success) {
            return {
                success: true,
                mensaje: result.data.msg
            }
        }

        return {
            success: false,
            mensaje: "Error al procesar la respuesta del servidor"
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { data } = error.response;
            const result = ConfirmarCuentaSchemaResponse.safeParse(data);

            if (result.success) {
                return {
                    success: false,
                    mensaje: result.data.msg
                }
            }
            return {
                success: false,
                mensaje: "Error del servidor"
            }

        }

        return {
            success: false,
            mensaje: "Error de conexion. Verifica tu internet"
        }
    }
}

export async function obtenerPerfil(): Promise<ObtenerPerfilResponse> {


    const url = '/veterinarios/perfil';

    try {
        const { data } = await clienteAxios.get(url);

        const result = PerfilVeterinarioSchemaResponse.safeParse(data);

        if (result.success) {
            return {
                success: true,
                data: result.data.data.veterinario,
            }
        }

        return {
            success: false,
            mensaje: 'Error del Servidor'
        }


    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { data } = error.response;
            const result = PerfilVeterinarioErrorSchemaResponse.safeParse(data);

            if (result.success) {
                return {
                    success: false,
                    mensaje: result.data.msg
                }
            }
            return {
                success: false,
                mensaje: 'Error del Servidor'
            }
        }
        return {
            success: false,
            mensaje: 'Error de conexión. Verifica tu internet'
        }
    }


}

export async function editarPerfil(veterinario: PerfilVeterinarioFormulario): Promise<EditarPerfilType> {

    const url = `/veterinarios/perfil/${veterinario._id}`;

    try {

        const { data } = await clienteAxios.put(url, veterinario);

        const result = EditarPerfilSchemaResponse.safeParse(data)

        if (result.success) {
            return {
                success: true,
                data: result.data.data.veterinario,
                mensaje: result.data.msg
            }
        }

        return {
            success: false,
            mensaje: 'Error del Servidor'
        }

    } catch (error) {

        if (axios.isAxiosError(error) && error.response) {
            const { data } = error.response;

            const result = EditarPerfilSchemaResponseError.safeParse(data);

            if (result.success) {
                return {
                    success: false,
                    mensaje: result.data.msg
                }
            }

            return {
                success: false,
                mensaje: 'Error del servidor'
            }
        }

        return {
            success: false,
            mensaje: 'Error de conexión. Verifica tu internet'
        }
    }
}

export async function cambiarPassword(passwords: VeterinarioCambiarPassword): Promise<CambiarPasswordVeterinarioType> {
    const url = '/veterinarios/cambiar-password';

    try {

        const { data } = await clienteAxios.put(url, passwords);
        const result = CambiarPasswordVeterinarioSchemaResponse.safeParse(data);

        if (result.success) {
            return {
                success: true,
                mensaje: result.data.msg
            }
        }

        return {
            success: false,
            mensaje: 'Error del servidor'
        }

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { data } = error.response;

            const result = CambiarPasswordVeterinarioSchemaResponse.safeParse(data);

            if (result.success) {
                return {
                    success: false,
                    mensaje: result.data.msg
                }
            }
            return {
                success: false,
                mensaje: 'Error del servidor'
            }

        }

        return {
            success: false,
            mensaje: 'Error de conexión. Verifica tu internet'
        }
    }
}

export async function olvidePassword(email: string): Promise<OlvidePasswordVeterinarioType> {
    const url = '/veterinarios/olvide-password';

    try {

        const { data } = await clienteAxios.post(url, { email });

        const result = OlvidePasswordVeterinarioSchemaResponse.safeParse(data);

        if (result.success) {
            return {
                success: true,
                mensaje: result.data.msg
            }
        }

        return {
            success: false,
            mensaje: 'Error del servidor'
        }

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { data } = error.response
            const result = OlvidePasswordVeterinarioSchemaResponse.safeParse(data);
            if (result.success) {
                return {
                    success: false,
                    mensaje: result.data.msg
                }
            }

            return {
                success: false,
                mensaje: 'Error del servidor'
            }

        }

        return {
            success: false,
            mensaje: 'Error de conexión. Verifica tu internet'
        }
    }
}

export async function comprobarToken(token: string | undefined): Promise<ComprobarTokenType> {
    const url = `/veterinarios/olvide-password/${token}`;

    try {
        const { data } = await clienteAxios.get(url);
        const result = ComprobarTokenSchemaResponse.safeParse(data);

        if (result.success) {
            return {
                success: true,
                mensaje: result.data.msg
            }
        }

        return {
            success: false,
            mensaje: 'Error del servidor'
        }

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { data } = error.response
            const result = ComprobarTokenSchemaResponse.safeParse(data);
            if (result.success) {
                return {
                    success: false,
                    mensaje: result.data.msg
                }
            }

            return {
                success: false,
                mensaje: 'Error del servidor'
            }

        }

        return {
            success: false,
            mensaje: 'Error de conexión. Verifica tu internet'
        }
    }
}

export async function nuevoPassword(params: NuevoPasswordParamsType): Promise<NuevoPasswordType> {
    const url = `/veterinarios/olvide-password/${params.token}`;

    try {

        const { data } = await clienteAxios.post(url, { password: params.password })

        const result = NuevoPasswordSchemaResponse.safeParse(data);
        if (result.success) {
            return {
                success: true,
                mensaje: result.data.msg
            }
        }

        return {
            success: false,
            mensaje: 'Error del servidor'
        }

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { data } = error.response
            const result = NuevoPasswordSchemaResponse.safeParse(data);
            if (result.success) {
                return {
                    success: false,
                    mensaje: result.data.msg
                }
            }

            return {
                success: false,
                mensaje: 'Error del servidor'
            }

        }

        return {
            success: false,
            mensaje: 'Error de conexión. Verifica tu internet'
        }
    }
}