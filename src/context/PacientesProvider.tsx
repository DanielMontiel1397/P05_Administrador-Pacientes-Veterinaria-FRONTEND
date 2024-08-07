import { createContext, useState, ReactNode, Dispatch, useEffect } from "react";
import clienteAxios from "../config/axios";
import axios from 'axios'
import type { PacienteLista } from "../types";
import { useAuth } from "../hooks/useAuth";

type PacientesProviderProps = {
    children: ReactNode
}

type PacientesContextProps = {
    pacientes: PacienteLista[];
    setPacientes: Dispatch<React.SetStateAction<PacienteLista[]>>;
    setPaciente: Dispatch<React.SetStateAction<PacienteLista>>
    guardarPaciente: (paciente : PacienteLista) => void;
    setEdicion: (paciente: PacienteLista) => void;
    eliminarPaciente: (id: PacienteLista['_id']) => void;
    paciente: PacienteLista;
}

const PacientesContext = createContext<PacientesContextProps>(null!);

const PacientesProvider = ({children} : PacientesProviderProps) => {
    const {auth} = useAuth()
    const [pacientes, setPacientes] = useState<PacienteLista[]>([]);
    const [paciente, setPaciente] = useState({
        nombre: '',
        email: '',
        _id: '',
        fecha: '',
        propietario: '',
        sintomas: ''
    })

    const guardarPaciente = async (paciente : PacienteLista) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        //Edicion
        if(paciente._id){
            try{
                const {data} = await clienteAxios.put(`/pacientes/${paciente._id}`,paciente,config);
                const pacientesActualizado = pacientes.map(paciente => paciente._id === data._id ? data : paciente);
                setPacientes(pacientesActualizado);
            } catch(error){
                if(axios.isAxiosError(error)){
                    console.log(error.response?.data?.msg);
                } else {
                    console.log('Error desconocido al actualizar el perfil');
                }
            }
            return;
        }

        try{

            const { data } = await clienteAxios.post('/pacientes',{
                email: paciente.email,
                nombre: paciente.nombre,
                fecha: paciente.fecha,
                propietario: paciente.propietario,
                sintomas: paciente.sintomas
            }, config)

            const pacienteAlmacenado = {
                email: data.email,
                nombre: data.nombre,
                fecha: data.fecha,
                propietario: data.propietario,
                sintomas: data.sintomas,
                veterinario: data.veterinario,
                _id: data._id
            }

            setPacientes([...pacientes, pacienteAlmacenado]);
            
        } catch(error){
            if(axios.isAxiosError(error)){
                console.log(error.response?.data?.msg);
            } else {
                console.log('Error desconocido al actualizar el perfil');
            }
        }
    }

    const setEdicion = (paciente : PacienteLista) => {
        const {nombre, email, _id, fecha, propietario, sintomas} = paciente;
        setPaciente({
            nombre,
            email,
            _id,
            fecha,
            propietario,
            sintomas
        });
    }

    const eliminarPaciente = async (id : PacienteLista['_id']) =>{
        const confirmar = confirm('¿Confirmas que deseas eliminar?');
        if(confirmar){
            try{
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                await clienteAxios.delete(`/pacientes/${id}`,config);
                const pacientesActualizado = pacientes.filter(paciente => paciente._id !== id);
                setPacientes(pacientesActualizado);
            } catch(error){
                if(axios.isAxiosError(error)){
                    console.log(error.response?.data?.msg);
                } else {
                    console.log('Error desconocido al actualizar el perfil');
                }
            }
        }

        //Vaciamos los campos de la edicion
        setPaciente({
            nombre: '',
            email: '',
            _id: '',
            fecha: '',
            propietario: '',
            sintomas: ''
        })
    }

    //Obtener pacientes para mostrarlos en pantalla
    useEffect(() => {

        const mostrarPacientes = async () => {
            const token = localStorage.getItem('token');

            if(!token){
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            try{
                const {data} = await clienteAxios.get('/pacientes', config);
                setPacientes(data);
            } catch(error){
                if(axios.isAxiosError(error)){
                    console.log(error.response?.data?.msg);
                } else {
                    console.log('Error desconocido al actualizar el perfil');
                }
            }
        }
        mostrarPacientes()
    },[auth])

    return(
        <PacientesContext.Provider
            value={{
                pacientes,
                setPacientes,
                guardarPaciente,
                setEdicion,
                eliminarPaciente,
                paciente,
                setPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export {
    PacientesProvider
}

export default PacientesContext;

