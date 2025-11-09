import { BrowserRouter,Routes,Route } from "react-router-dom";
import RutaProtegida from "./layout/RutaProtegida";

import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import OlvidePassword from "./paginas/OlvidePassword";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import NuevoPassword from "./paginas/NuevoPassword";

import AdministrarPacientes from "./paginas/AdministrarPacientes";
import EditarPerfil from "./paginas/EditarPerfil";
import CambiarPassword from "./paginas/CambiarPassword";
import { useAppStore } from "./stores/useAppStore";
import { useEffect } from "react";
import RutaPublica from "./layout/RutaPublica";

function App() {

  const checkAuth = useAppStore(state => state.obtenerPerfil);

  useEffect(() => {
    checkAuth();
  }, [])

  return (
    <>
      <BrowserRouter>

            <Routes>

              <Route path="/" element={<RutaPublica/>}>
                <Route index element={<Login />} />
                <Route path="registrar" element={<Registrar />} />
                <Route path="olvide-password" element={<OlvidePassword />} />
                <Route path="olvide-password/:token" element={<NuevoPassword />} />
                <Route path="confirmar-cuenta/:id" element={<ConfirmarCuenta />} />
              </Route>

              <Route path="/admin" element={<RutaProtegida/>}>
                <Route index element={<AdministrarPacientes/>} />
                <Route path="perfil" element={<EditarPerfil/>}/>
                <Route path="cambiar-password" element={<CambiarPassword/>}/>
              </Route>

            </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
