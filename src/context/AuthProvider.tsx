import { useState, useEffect, createContext, ReactNode, Dispatch } from "react";
import clienteAxios from "../config/axios";
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
    actualizarPerfil: (perfil : PerfilVeterinario) => { msg: string, error: boolean;};
    cambiarPassword: (password: VeterinarioCambiarPassword) => { msg: string, error: boolean;};
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
                console.log(error.response.data.msg);
                setAuth({
                    nombre: '',
                    email: '',
                    telefono: '',
                    web: '',
                    _id: '',
                    token: ''
                })
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

    const actualizarPerfil = async (perfil : PerfilVeterinario) => {

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
            const url = `/veterinarios/perfil/${perfil._id}`;
            const {data} = await clienteAxios.put(url,perfil,config);
            return {
                msg: `Veterinario ${data.nombre} Actualizado Correctamente`,
                error: false
            }
        } catch(error){
            return {
                msg: error.response.data.msg,
                error: true
            }
        }

    }

    const cambiarPassword = async ( password : VeterinarioCambiarPassword) => {
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
             const url = `/veterinarios/cambiar-password`;
             const {data} = await clienteAxios.put(url, password, config);

             return({
                msg: data.msg,
                error: false
             })
        } catch(error){
            return({
                msg: error.response.data.msg,
                error: true
             })
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