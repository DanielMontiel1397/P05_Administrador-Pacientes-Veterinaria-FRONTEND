import { useState, useEffect, createContext, ReactNode, Dispatch } from "react";
import clienteAxios from "../config/axios";
import axios from 'axios';

import { PerfilVeterinario, VeterinarioAuth, VeterinarioCambiarPassword } from "../types";


type AuthProviderProps = {
    children: ReactNode
}

type AuthContextProps = {
    auth: VeterinarioAuth;
    cargando: boolean;
    setAuth: Dispatch<React.SetStateAction<VeterinarioAuth>>;
    setCargando: Dispatch<React.SetStateAction<boolean>>;
    cerrarSesion: () => void;
    actualizarPerfil: (perfil : PerfilVeterinario) => Promise<{ msg: string, error: boolean;}> ;
    cambiarPassword: (password: VeterinarioCambiarPassword) =>  Promise<{ msg: string, error: boolean;}>;
};

const AuthContext = createContext<AuthContextProps>(null!);

const AuthProvider = ({children} : AuthProviderProps) => {

    const [cargando, setCargando] = useState(true);
    const [auth,setAuth] = useState<VeterinarioAuth>({
        nombre: '',
        email: '',
        telefono: '',
        web: '',
        _id: '',
        token: ''
    });

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            
            if(!token){
                setCargando(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try{
                const {data} = await clienteAxios.get('/veterinarios/perfil', config);
                setAuth(data.veterinario)

            } catch (error){
                if(axios.isAxiosError(error)){
                    setAuth({
                        nombre: '',
                        email: '',
                        telefono: '',
                        web: '',
                        _id: '',
                        token: ''
                    })
                    return {
                        msg: error.response?.data?.msg,
                        error: true
                    }
                } else {
                    // Manejar otros tipos de errores (opcional)
                    return {
                        msg: 'Error desconocido al actualizar el perfil',
                        error: true
                    };
                }
            }           
            setCargando(false);
        }   
        autenticarUsuario();
    },[])

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setAuth({
            nombre: '',
            email: '',
            telefono: '',
            web: '',
            _id: '',
            token: ''
        })
    }

    const actualizarPerfil = async (perfil : PerfilVeterinario): Promise<{ msg: string, error: boolean }> => {

        const token = localStorage.getItem('token');
            
        if(!token){
            setCargando(false);
            return({
                msg: 'Token no encontrado',
                error: true
            })
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try{
            const url = `/veterinarios/perfil/${perfil._id}`;
            const {data} = await clienteAxios.put(url,perfil,config);
            return {
                msg: `Veterinario ${data.nombre} Actualizado Correctamente`,
                error: false
            }
        } catch(error){
            if(axios.isAxiosError(error)){
                return {
                    msg: error.response?.data?.msg,
                    error: true
                }
            } else {
                // Manejar otros tipos de errores (opcional)
                return {
                    msg: 'Error desconocido al actualizar el perfil',
                    error: true
                };
            }
        }

    }

    const cambiarPassword = async ( password : VeterinarioCambiarPassword): Promise<{msg: string; error: boolean;}> => {
        const token = localStorage.getItem('token');
            
        if(!token){
            setCargando(false);
            return({
                msg: 'Token no encontrado',
                error: true
            })
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try{
             const url = `/veterinarios/cambiar-password`;
             const {data} = await clienteAxios.put(url, password, config);

             return({
                msg: data.msg,
                error: false
             })
        } catch(error){
            if(axios.isAxiosError(error)){
                return {
                    msg: error.response?.data?.msg,
                    error: true
                }
            } else {
                // Manejar otros tipos de errores (opcional)
                return {
                    msg: 'Error desconocido al actualizar el perfil',
                    error: true
                };
            }
        }
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                setCargando,
                actualizarPerfil,
                cambiarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;