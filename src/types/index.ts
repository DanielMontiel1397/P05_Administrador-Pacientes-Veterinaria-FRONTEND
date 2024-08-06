
export type Veterinario = {
    nombre: string,
    email: string,
    password: string,
    repetirPassword: string
}

export type VeterinarioCambiarPassword = {
    passwordActual: string,
    nuevoPassword: string
}

export type VeterinarioLogin = Omit<Veterinario, 'nombre' | 'repetirPassword'>;

export type PerfilVeterinario = Omit<Veterinario, 'password' | 'repetirPassword'> & {
    web: string,
    telefono: string,
    _id: string
}

export type VeterinarioAuth = Omit<Veterinario, 'password' | 'repetirPassword'> & {
    _id: string,
    token: string,
    telefono: string ,
    web: string 
};

export type MensajeAlerta = {
    msg: string,
    error: boolean
}

export type Paciente ={
    nombre: string,
    propietario: string,
    email: string,
    fecha: string,
    sintomas: string
}

export type PacienteLista = Paciente &{
    _id: string
}