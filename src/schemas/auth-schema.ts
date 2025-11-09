import {z} from "zod";

export const VeterinarioSchemaResponse = z.object({
        _id: z.string(),
        nombre: z.string(),
        email: z.string(),
        telefono: z.string().nullable(),
        token: z.string(),
        web: z.string().nullable(),
        __v: z.number()
})

export const RegistroSchemaResponse = z.object({
    msg: z.string()
})

export const LoginSucessSchemaResponse = z.object({
    data: VeterinarioSchemaResponse.omit({__v: true}),
    msg: z.string()
})

export const LoginErrorSchemaResponse = z.object({
    msg: z.string()
})

export const PerfilVeterinarioSchemaResponse = z.object({
    data: z.object({
        veterinario: VeterinarioSchemaResponse.omit({token: true})
    })
})

export const PerfilVeterinarioErrorSchemaResponse = z.object({
    msg: z.string()
})

export const ConfirmarCuentaSchemaResponse = z.object({
    msg: z.string()
})

//Schemas EDITAR PERFIL

export const EditarPerfilSchemaResponse = z.object({
    data: z.object({
        veterinario: VeterinarioSchemaResponse.omit({__v: true, token: true})
    }),
    msg: z.string()
})

export const EditarPerfilSchemaResponseError = z.object({
    msg: z.string()
})

//SCHEMA CAMBIAR PASSWORD
export const CambiarPasswordVeterinarioSchemaResponse = z.object({
    msg: z.string()
})

//SCHEMA OLVIDE PASSWORD
export const OlvidePasswordVeterinarioSchemaResponse = z.object({
    msg: z.string()
})

//SCHEMA COMPROBAR TOKEN
export const ComprobarTokenSchemaResponse = z.object({
    msg: z.string()
})

//CREAR NUEVO PASSWORD
export const NuevoPasswordSchemaResponse = z.object({
    msg: z.string()
})