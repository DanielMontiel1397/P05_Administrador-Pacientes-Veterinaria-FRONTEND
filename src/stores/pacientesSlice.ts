import { StateCreator } from "zustand";
import { Paciente, PacienteFormulario, PacienteListaEditar } from "../types";
import { obtenerPacientes, crearPaciente, editarPaciente, eliminarPaciente } from "../services/pacienteService";
import { AlertaFormularioSliceType } from "./alertaFormularioSlice";

export type PacienteSliceType = {
    loadingPacientes: boolean
    pacientes: Paciente[]
    pacienteFormulario: PacienteFormulario
    pacienteEditar: PacienteListaEditar
    obtenerPacientes: () => Promise<void>
    setPaciente: (paciente: PacienteListaEditar) => void
    limpiarPacienteEditar: () => void
    crearPaciente: (paciente: PacienteFormulario) => Promise<boolean>
    actualizarPaciente: (id: PacienteListaEditar) => Promise<boolean>
    eliminarPaciente: (id: PacienteListaEditar['_id']) => Promise<void>
    limpiarPacientes: () => void
}

export const pacienteSlice: StateCreator<PacienteSliceType & AlertaFormularioSliceType, [], [], PacienteSliceType> = (set, get) => ({
    loadingPacientes: false,

    pacientes: [],

    pacienteFormulario: {
        nombre: '',
        propietario: '',
        email: '',
        fecha: '',
        sintomas: ''
    },

    pacienteEditar: {
        nombre: '',
        propietario: '',
        email: '',
        fecha: '',
        sintomas: '',
        _id: ''
    },

    crearPaciente: async (paciente) => {

        try {

            const respuesta = await crearPaciente(paciente);

            if (respuesta.success) {
                const nuevosPacientes = [...get().pacientes, respuesta.data]

                set({
                    pacientes: nuevosPacientes
                })

            }

            get().mostrarAlerta({
                mensaje: respuesta.mensaje,
                error: !respuesta.success
            })

            return respuesta.success

        } catch (error) {
            get().mostrarAlerta({
                mensaje: 'Error inesperado al crear el paciente',
                error: true
            })
            return false;
        }
    },

    setPaciente: (paciente) => {
        set({
            pacienteEditar: paciente
        })
    },

    limpiarPacienteEditar: () => {
        set({
            pacienteEditar: {
                nombre: '',
                propietario: '',
                email: '',
                fecha: '',
                sintomas: '',
                _id: ''
            }
        })
    },

    actualizarPaciente: async (paciente) => {

        try {
            const respuesta = await editarPaciente(paciente);

            if (respuesta.success) {
                const pacientesActualizados = get().pacientes.map(paciente => paciente._id === respuesta.data._id ? respuesta.data : paciente);

                set({
                    pacientes: pacientesActualizados
                });
            }

            get().mostrarAlerta({
                mensaje: respuesta.mensaje,
                error: !respuesta.success
            })
            return respuesta.success;

        } catch (error) {
            get().mostrarAlerta({
                mensaje: 'Error inesperado al actualizar el paciente',
                error: true
            })
            return false;
        }

    },

    eliminarPaciente: async (id) => {

        try {
            const respuesta = await eliminarPaciente(id);

            if (respuesta.success) {
                const pacientesActualizados = get().pacientes.filter(paciente => paciente._id !== id);

                set({
                    pacientes: pacientesActualizados
                })
            }
            get().mostrarAlerta({
                mensaje: respuesta.mensaje,
                error: !respuesta.success
            });

        } catch (error) {
            get().mostrarAlerta({
                mensaje: 'Error inesperado al eliminar el paciente',
                error: true
            })
        }

    },

    obtenerPacientes: async () => {

        set({
            loadingPacientes: true
        })

        try {

            const respuesta = await obtenerPacientes();

            if (respuesta.success) {
                set({
                    pacientes: respuesta.data,
                    loadingPacientes: false
                });
                return;
            } else {
                set({
                    loadingPacientes: false
                });
                console.log(respuesta.mensaje);
            }
        } catch (error) {
            set({
                loadingPacientes: false
            });
            console.log(error);
        }
    },

    limpiarPacientes: () => {
        set({
            pacientes: [],
            pacienteFormulario: {
                nombre: '',
                propietario: '',
                email: '',
                fecha: '',
                sintomas: ''
            },
            pacienteEditar: {
                nombre: '',
                propietario: '',
                email: '',
                fecha: '',
                sintomas: '',
                _id: ''
            }
        })
    }
})