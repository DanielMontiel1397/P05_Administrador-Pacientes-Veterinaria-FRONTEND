import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Alerta from "../components/Alerta";
import { useAppStore } from "../stores/useAppStore";
import Spinner from "../components/Spinner";


export default function ConfirmarCuenta() {
  const alerta = useAppStore(state => state.alerta);
  const confirmarCuenta = useAppStore(state => state.confirmarCuenta);
  const cargando = useAppStore(state => state.loading);

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmar = async () => {
      const resultado = await confirmarCuenta(id);
      setCuentaConfirmada(resultado);
    }
    confirmar()
  }, [])

  const msg = alerta.mensaje;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tú Cuenta y Comienza a Administrar {''}
          <span className="text-black"> Pacientes
          </span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

        {!cargando ?
          (<>
            {
              msg && <Alerta
                alerta={alerta}
              />
            }
            <Link className="block text-lg text-center my-5 text-gray-500 hover:text-gray-600" to="/">
              Regresar a página principal
            </Link>
          </>
          ) :
          (<Spinner />)
        }

        {cuentaConfirmada &&
          <Link className="block text-center my-5 text-gray-500 hover:text-gray-600" to="/">Iniciar Sesión</Link>
        }

      </div>
    </>
  )
}