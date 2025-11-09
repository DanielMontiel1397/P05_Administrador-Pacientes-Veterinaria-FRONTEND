import {  useState, useEffect } from "react"
import { PacienteFormulario } from "../types"
import Alerta from "./Alerta";
//import { usePacientes } from "../hooks/usePacientes";
import { useAppStore } from "../stores/useAppStore";


export default function Formulario() {

    const [paciente,setPaciente] = useState<PacienteFormulario>({
        nombre: '',
        propietario: '',
        email: '',
        fecha: '',
        sintomas: ''
    });

    const [id, setId] = useState('')

    const alerta = useAppStore(state => state.alerta);
    const mostrarAlerta = useAppStore(state => state.mostrarAlerta);
    const crearPaciente = useAppStore(state =>state.crearPaciente);
    const pacienteEditar = useAppStore(state => state.pacienteEditar);
    const editarPaciente = useAppStore(state => state.actualizarPaciente)
    const limpiarPacienteEditar = useAppStore(state => state.limpiarPacienteEditar);

    //const {guardarPaciente, paciente: pacienteEditar } = usePacientes()

    useEffect(() => {
        if(pacienteEditar?.nombre){
            setPaciente({
                nombre: pacienteEditar.nombre,
                propietario: pacienteEditar.propietario,
                email: pacienteEditar.email,
                fecha: pacienteEditar.fecha,
                sintomas: pacienteEditar.sintomas
            });
            setId(pacienteEditar._id)
        }
    }, [pacienteEditar])
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setPaciente({
            ...paciente,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        //Comprobar campos
        if(Object.values(paciente).includes('')){
            mostrarAlerta({
                mensaje: "Todos los campos son obligatorios",
                error: true
            });
            return
        }

        //Validar Nombre Mascota
        if(!(/^[A-Za-z\s]+$/.test(paciente.nombre))){
            mostrarAlerta({
            mensaje: 'El Nombre de la mascota tienen que ser sólo letras',
            error: true
            })
            return;
        }
        //Validar Nombre Propietario
        if(!(/^[A-Za-z\s]+$/.test(paciente.propietario))){
            mostrarAlerta({
            mensaje: 'El Nombre del propietario tienen que ser sólo letras',
            error: true
            })
            return;
        }

        //Validar email
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        if(!regex.test(paciente.email)){
            mostrarAlerta({
            mensaje: 'El Email no es valido',
            error: true
            })
            return;
        }

        //Si no tiene un id el Paciente entonces se quiere crear, caso contrario editar

        const exitoso = await (id ?
            editarPaciente({
                ...paciente,
                _id: id
            }) :
            crearPaciente(paciente)
        )
   
        if(exitoso){
            //Resetear State
            setPaciente({
                nombre: '',
                propietario: '',
                email: '',
                fecha: '',
                sintomas: ''
            });
            
            setId('');
            limpiarPacienteEditar();
        }
        
    }

    const msg = alerta.mensaje;

  return (
    <>
        <h2 className="font-black text-3xl text-center">
            Administrador de Pacientes
          </h2>

        <p className="text-xl my-3 text-center">
            Añade tus pacientes y {''}
            <span className="text-indigo-600 font-bold">Administralos</span>
          </p>

        {msg &&
            <Alerta
                alerta={alerta}
            />}

        <form 
            action="" 
            className="bg-white py-7 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
            onSubmit={handleSubmit}>
            <div className="mb-5">
                <label 
                    htmlFor="nombre"
                    className="uppercase text-gray-700 font-bold">
                        Mascota
                </label>
                <input 
                    id="nombre"
                    type="text"
                    placeholder="Nombre de la Mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    onChange={ handleChange}
                    value={paciente.nombre} />
            </div>

            <div className="mb-5">
                <label 
                    htmlFor="propietario"
                    className="uppercase text-gray-700 font-bold">
                        Nombre Propietario
                </label>
                <input 
                    id="propietario"
                    type="text"
                    placeholder="Nombre del Propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    onChange={ handleChange}
                    value={paciente.propietario} />
            </div>

            <div className="mb-5">
                <label 
                    htmlFor="email"
                    className="uppercase text-gray-700 font-bold">
                        Email
                </label>
                <input 
                    id="email"
                    type="text"
                    placeholder="Email del Propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    onChange={ handleChange}
                    value={paciente.email} />
            </div>

            <div className="mb-5">
                <label 
                    htmlFor="fecha"
                    className="uppercase text-gray-700 font-bold">
                        Fecha Alta
                </label>
                <input 
                    id="fecha"
                    type="date"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    onChange={ handleChange}
                    value={paciente.fecha} />
            </div>

            <div className="mb-5">
                <label 
                    htmlFor="sintomas"
                    className="uppercase text-gray-700 font-bold">
                        Sintomas
                </label>
                <textarea
                    id="sintomas"
                    placeholder="Describe los Sintomas"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    onChange={ handleChange}
                    value={paciente.sintomas} />
            </div>

            <input 
                type="submit"
                value={id ? "Editar Paciente" : "Agregar Paciente"}
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors" />


        </form>
    </>
  )
}
