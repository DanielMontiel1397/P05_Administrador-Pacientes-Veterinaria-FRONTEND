import axios from "axios";
import clienteAxios from "../config/axios"
import { PacienteCreadoSchemaResponse, PacienteEliminarResponse, PacientesSchemaErrorResponse, PacientesSchemaResponse } from "../schemas/paciente-schema";
import { ObtenerPacientes, PacienteCreado, PacienteEliminado, PacienteFormulario, PacienteListaEditar } from "../types";


export async function obtenerPacientes () : Promise<ObtenerPacientes>{

    const url = '/pacientes'

    try {
        
        const {data} = await clienteAxios.get(url);
    
        const result = PacientesSchemaResponse.safeParse(data);
        
        if(result.success){
            return {
                success: true,
                data: result.data.data.pacientes,
                mensaje: result.data.msg
            }
        }

        return {
            success: false,
            mensaje: 'Error del servidor'
        }
        
    } catch (error) {
        if(axios.isAxiosError(error) && error.response){
            const {data} = error.response;
            const result = PacientesSchemaErrorResponse.safeParse(data);

            if(result.success){
                return {
                    success: false,
                    mensaje: result.data.msg
                }
            }

            return {
                success: false,
                mensaje: 'Error del servidor'}
        }
        return {
            success: false,
            mensaje: 'Error de conexión, verifica tu internet'};
    }

}

export async function crearPaciente(paciente : PacienteFormulario) : Promise<PacienteCreado> {
    
    const url = '/pacientes';

    try {
        const {data} = await clienteAxios.post(url, paciente);

        const result = PacienteCreadoSchemaResponse.safeParse(data);
        
        if(result.success){
            return {
                success: true,
                data: result.data.data.paciente,
                mensaje: result.data.msg
            }
        } 

        return {
            success: false,
            mensaje: 'Error del servidor'
        }

    } catch (error) {
        if(axios.isAxiosError(error) && error.response){
            const {data} = error.response;
            const result = PacientesSchemaErrorResponse.safeParse(data);

            if(result.success){
                return {
                    success: false,
                    mensaje: result.data.msg
                }
            }

            return {
                success: false,
                mensaje: 'Error del servidor'}
        }
        return {
            success: false,
            mensaje: 'Error de conexión, verifica tu internet'
        };
    }

}

export async function editarPaciente(paciente: PacienteListaEditar) : Promise<PacienteCreado> {
    const url = `/pacientes/${paciente._id}`;

    try {
        const {data} = await clienteAxios.put(url, paciente);
        const result = PacienteCreadoSchemaResponse.safeParse(data);

        if(result.success){
            return {
                success: true,
                data: result.data.data.paciente,
                mensaje: result.data.msg
            }
        }

        return {
            success: false,
            mensaje: 'Error del servidor'
        }

    } catch (error) {
        if(axios.isAxiosError(error) && error.response){
            const {data} = error.response;
            const result = PacientesSchemaErrorResponse.safeParse(data);

            if(result.success){
                return {
                    success: false,
                    mensaje: result.data.msg
                }
            }

            return {
                success: false,
                mensaje: 'Error del servidor'}
        }
        return {
            success: false,
            mensaje: 'Error de conexión, verifica tu internet'
        };
    }
}

export async function eliminarPaciente(id : PacienteListaEditar['_id']) : Promise<PacienteEliminado> {
    const url = `/pacientes/${id}`;

    try {
        const {data} = await clienteAxios.delete(url);
   
        const result = PacienteEliminarResponse.safeParse(data);
   
        if(result.success){
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
        if(axios.isAxiosError(error) && error.response){
            const {data} = error.response;
            const result = PacientesSchemaErrorResponse.safeParse(data);

            if(result.success){
                return {
                    success: false,
                    mensaje: result.data.msg
                }
            }

            return {
                success: false,
                mensaje: 'Error del servidor'}
        }
        return {
            success: false,
            mensaje: 'Error de conexión, verifica tu internet'
        };
    }
}