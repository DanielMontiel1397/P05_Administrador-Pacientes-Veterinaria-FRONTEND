import { usePacientes } from "../hooks/usePacientes"
import Paciente from "./Paciente";


export default function ListadoPacientes() {

  const {pacientes} = usePacientes();

  return (
    <>
      {pacientes.length ? (
        <>
          <h2 className="font-black text-3xl text-center">
            Listado Pacientes
          </h2>

          <p className="text-xl my-3 text-center">
            Administra tus {''}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>

          {pacientes.map( paciente => (
            <Paciente
              key={paciente._id}
              paciente={paciente}
            />
          ))}

        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">
            No Hay Pacientes
          </h2>

          <p className="text-xl mt-10 text-center mb-10">
            Comienza Agregando Pacientes {''}
            <span className="text-inidgo-600 font-bold">y aparecerán en este lugar</span>
          </p>
        </>
      )
    }
    </>
  )
}
