import { Link, useNavigate } from "react-router-dom"
//import { useAuth } from "../hooks/useAuth"
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
    const navigate = useNavigate()
    const cerrarSesion = useAppStore(state => state.cerrarSesion);
    const limpiarPacientes = useAppStore(state =>state.limpiarPacientes);

    const cerrarLaSesion = () => {
        limpiarPacientes();
        cerrarSesion();
        navigate('/')
    }


return (

    <header className="py-10 bg-indigo-600">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
            <h1 className="font-bold text-2xl text-indigo-200 text-center">Administrador de Pacientes de {''}
                <span className="text-white font-black">
                    Veterinaria
                </span>
            </h1>

            <nav className="flex flex-col lg:flex-row mt-5 lg:mt-0 items-center gap-4 ">
                <Link to="/admin" className="text-white text-md uppercase font-bold">Pacientes</Link>
                <Link to="/admin/perfil" className="text-white text-md uppercase font-bold">Perfil</Link>

                <button
                    type="button"
                    className="text-white text-md uppercase font-bold"
                    onClick={()=>cerrarLaSesion()}
                >Cerrar Sesion</button>
            </nav>

        </div>
    </header>

  )
}
