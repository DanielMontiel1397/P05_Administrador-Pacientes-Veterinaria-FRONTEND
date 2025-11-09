import {z} from "zod";

export const PacienteSchemaResponse = z.object({
    _id: z.string(),
    nombre: z.string(),
    propietario: z.string(),
    email: z.string(),
    fecha: z.string(),
    sintomas: z.string(),
    veterinario: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    __v: z.number()
})

export const PacientesSchemaResponse = z.object({
    data: z.object({
        pacientes: z.array(PacienteSchemaResponse)
    }),
    msg: z.string()
})

export const PacienteCreadoSchemaResponse = z.object({
    data: z.object({
        paciente: PacienteSchemaResponse
    }),
    msg: z.string()
})

export const PacientesSchemaErrorResponse = z.object({
    msg: z.string()
})

//ELIMINAR PACIENTE
export const PacienteEliminarResponse = z.object({
    msg: z.string()
})
