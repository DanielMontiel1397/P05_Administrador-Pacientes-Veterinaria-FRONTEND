import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";
import { useEffect, useState } from "react";
import { useAppStore } from "../stores/useAppStore";
import Spinner from "../components/Spinner";

export default function AdministrarPacientes() {

  const pacientesStore = useAppStore(state => state.obtenerPacientes);
  const loadingPacientes = useAppStore(state => state.loadingPacientes);

  useEffect(() => {
    pacientesStore()
  }, [])

  const [mostrarFormulario,setMostrarFormulario] = useState(false)

  return (
    <div className="flex flex-col md:flex-row gap-10">
        <button
          type="button"
          className="bg-indigo-600 text-white font-bold uppercase mx-10 p-3 rounded-md mb-10 md:hidden"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          {mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}
        </button>

        <div className={`${mostrarFormulario ? 'block' : 'hidden'} md:block w-full md:w-1/2 lg:w-2/5`}>
          <Formulario/>
        </div>

        <div className="w-full md:w-1/2 lg:w-3/5">
          {loadingPacientes ? (
            <Spinner/>
          ) : (
            <ListadoPacientes/>
          )}
        </div>
    </div>
  )
}
