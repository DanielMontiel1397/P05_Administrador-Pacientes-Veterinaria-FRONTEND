//import { usePacientes } from "../hooks/usePacientes";
import { useAppStore } from "../stores/useAppStore";
import type { PacienteListaEditar } from "../types"

type PacienteProps = {
    paciente: PacienteListaEditar
}

export default function Paciente({paciente} : PacienteProps) {

    //const {setEdicion, eliminarPaciente} = usePacientes();

    const setEdicion = useAppStore(state => state.setPaciente);
    const eliminarPaciente = useAppStore(state => state.eliminarPaciente);

    const pacienteListaMostrar = {
        nombre: paciente.nombre,
        email: paciente.email,
        _id: paciente._id,
        fecha: paciente.fecha,
        propietario: paciente.propietario,
        sintomas: paciente.sintomas
    }

    const formatearFecha = (fecha : string) => {
        const nuevaFecha = new Date(fecha);
        return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(nuevaFecha);
    }

  return (
    <div className="my-5 bg-white shadow-md px-5 py-10 rounded-xl">
        <p className="font-bold uppercase text-indigo-800 my-2">Nombre: {''}
            <span className="font-normal normal-case text-black">{pacienteListaMostrar.nombre}</span>
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">Propietario: {''}
            <span className="font-normal normal-case text-black">{pacienteListaMostrar.propietario}</span>
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">Email: {''}
            <span className="font-normal normal-case text-black">{pacienteListaMostrar.email}</span>
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">Fecha de Alta: {''}
            <span className="font-normal normal-case text-black">{formatearFecha(pacienteListaMostrar.fecha)}</span>
        </p>
        <p className="font-bold uppercase text-indigo-800 my-2">Sintomas: {''}
            <span className="font-normal normal-case text-black">{pacienteListaMostrar.sintomas}</span>
        </p>

        <div className="flex justify-between my-5">
            <button
                type="button"
                className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
                onClick={() => setEdicion(pacienteListaMostrar)}
            >
                Editar
            </button>

            <button
                type="button"
                className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg"
                onClick={()=> eliminarPaciente(pacienteListaMostrar._id)}
            >
                Eliminar
            </button>
        </div>
    </div>
  )
}
