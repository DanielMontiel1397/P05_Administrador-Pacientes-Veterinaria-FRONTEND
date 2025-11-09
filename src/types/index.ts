import {z} from "zod";
import { CambiarPasswordVeterinarioSchemaResponse, ComprobarTokenSchemaResponse, ConfirmarCuentaSchemaResponse, EditarPerfilSchemaResponse, EditarPerfilSchemaResponseError, LoginErrorSchemaResponse, LoginSucessSchemaResponse, NuevoPasswordSchemaResponse, OlvidePasswordVeterinarioSchemaResponse, PerfilVeterinarioErrorSchemaResponse, PerfilVeterinarioSchemaResponse, RegistroSchemaResponse } from "../schemas/auth-schema";
import { PacienteCreadoSchemaResponse, PacienteEliminarResponse, PacienteSchemaResponse, PacientesSchemaErrorResponse, PacientesSchemaResponse } from "../schemas/paciente-schema";



export type MensajeAlerta = {
    msg: string | undefined,
    error: boolean
}


//ZOD

export type Registro = z.infer<typeof RegistroSchemaResponse>;

//Type para perfil Veterinario
export type Veterinario = {
    nombre: string,
    email: string,
    password: string,
    repetirPassword: string
}

//Type para respuesta de Login
export type LoginSuccess = z.infer<typeof LoginSucessSchemaResponse>;

export type LoginError = z.infer<typeof LoginErrorSchemaResponse>;

export type VeterinarioLogin = Omit<Veterinario, 'nombre' | 'repetirPassword'>;

export type VeterinarioAuth = Omit<Veterinario, 'password' | 'repetirPassword'> & {
    _id: string,
    token: string,
    telefono: string | null,
    web: string | null
};

export type LoginSuccessResponse = {
    success: true;
    data: VeterinarioAuth;
    mensaje: string;
}

export type LoginErrorResponse = {
    success: false;
    mensaje: string;
}

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;

export type Alerta = {
    mensaje: string
    error: boolean
}

export type ConfirmarCuenta = z.infer<typeof ConfirmarCuentaSchemaResponse>

export type ConfirmarCuentaType = {
    success: boolean,
    mensaje: string
}

//Type respuesta Perfil
export type PerfilVeterinarioFormulario = {
    nombre: string,
    email: string,
    telefono: string | null,
    web: string | null,
    _id: string
}

export type PerfilVeterinario = z.infer<typeof PerfilVeterinarioSchemaResponse>;

export type PerfilVeterinarioError = z.infer<typeof PerfilVeterinarioErrorSchemaResponse>;

export type ObtenerPerfilVeterinarioSuccess = {
    success: true;
    data: Omit<VeterinarioAuth, 'token'>;
}

export type ObtenerPerfilVeterinarioError = {
    success: false;
    mensaje: string
}

export type ObtenerPerfilResponse = ObtenerPerfilVeterinarioSuccess | ObtenerPerfilVeterinarioError;

//Type editar Perfil

export type EditarPerfilResponseType = z.infer<typeof EditarPerfilSchemaResponse>

export type EditarPerfilResponseErrorType = z.infer<typeof EditarPerfilSchemaResponseError>

export type EditarPerfilSuccessType = {
    success: true,
    data: PerfilVeterinarioFormulario,
    mensaje: string
}

export type EditarPerfilErrorType = {
    success: false,
    mensaje: string
}

export type EditarPerfilType = EditarPerfilSuccessType | EditarPerfilErrorType;


//PACIENTES
export type PacientesSuccess = z.infer<typeof PacientesSchemaResponse>;

export type Paciente = z.infer<typeof PacienteSchemaResponse>;

export type PacientesError = z.infer<typeof PacientesSchemaErrorResponse>;

export type ObtenerPacientesSuccess = {
    success: true,
    data: Paciente[],
    mensaje: string
};

export type ObtenerPacientesError = {
    success: false,
    mensaje: string
}

export type ObtenerPacientes = ObtenerPacientesSuccess | ObtenerPacientesError;

export type PacienteFormulario = {
    nombre: string,
    propietario: string,
    email: string,
    fecha: string,
    sintomas: string
}

export type PacienteListaEditar = PacienteFormulario & {
    _id: string
}

//Agregar Pacientes
export type PacienteCreadoResponse = z.infer<typeof PacienteCreadoSchemaResponse>;

export type PacienteCreadoResponseError = z.infer<typeof PacientesSchemaErrorResponse>;

export type PacienteCreadoSuccess = {
    success: true,
    data: Paciente,
    mensaje: string
}

export type PacienteCreadoError = {
    success: false,
    mensaje: string
}

export type PacienteCreado = PacienteCreadoSuccess | PacienteCreadoError;

//Eliminar Paciente

export type EliminarPaciente = z.infer<typeof PacienteEliminarResponse>

export type PacienteEliminado= {
    success: boolean,
    mensaje: string
}


//CAMBIAR PASSWORD
export type VeterinarioCambiarPassword = {
    passwordActual: string,
    nuevoPassword: string
}

export type CambiarPasswordVeterinarioResponseType = z.infer<typeof CambiarPasswordVeterinarioSchemaResponse>

export type CambiarPasswordSuccess = {
    success: true,
    mensaje: string
}

export type CambiarPasswordError = {
    success: false,
    mensaje: string
}

export type CambiarPasswordVeterinarioType = CambiarPasswordSuccess | CambiarPasswordError;

//TYPES OLVIDE PASSWORD

export type OlvidePasswordVeterinarioResponseType = z.infer<typeof OlvidePasswordVeterinarioSchemaResponse>;

export type OlvidePasswordSuccess = {
    success: true,
    mensaje: string
}

export type OlvidePasswordError = {
    success: false,
    mensaje: string
}

export type OlvidePasswordVeterinarioType = OlvidePasswordSuccess | OlvidePasswordError;

//TYPES COMPROBAR TOKEN
export type ComprobarTokenResponseType = z.infer<typeof ComprobarTokenSchemaResponse>

export type ComprobarTokenSuccess = {
    success: true,
    mensaje: string
}

export type ComprobarTokenError = {
    success: false,
    mensaje: string
}

export type ComprobarTokenType = ComprobarTokenSuccess | ComprobarTokenError;

//TYPES NUEVO PASSWORD
export type NuevoPasswordSchemaResponseType = z.infer<typeof NuevoPasswordSchemaResponse>

export type NuevoPasswordSuccess = {
    success: true,
    mensaje: string
}

export type NuevoPasswordError = {
    success: false,
    mensaje: string
}

export type NuevoPasswordType = NuevoPasswordSuccess | NuevoPasswordError;

export type NuevoPasswordParamsType = {
    password: string | undefined,
    token: string | undefined
}