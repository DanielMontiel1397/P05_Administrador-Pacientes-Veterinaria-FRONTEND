
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Alerta from "../components/Alerta";
import { MensajeAlerta } from "../types";
import clienteAxios from "../config/axios";
import axios from 'axios'


export default function ConfirmarCuenta() {
    const [cuentaConfirmada,setCuentaConfirmada] = useState(false);
    const [cargando,setCargando] = useState(true);
    const [alerta, setAlerta] = useState<MensajeAlerta>({
      msg: '',
      error: false
    })

    const params = useParams();
    const {id} = params;
    
    useEffect(()=>{
      const confirmarCuenta = async () => {
        
        try{
          const url = `/veterinarios/confirmar/${id}`;
          const {data} = await clienteAxios.get(url);
          setCuentaConfirmada(true);
          setAlerta({
            msg: data.msg,
            error: false})

        } catch(error){
          if(axios.isAxiosError(error)){
            setAlerta({
                msg: error.response?.data?.msg,
                error: true
            })
        } else {
          console.log('Error desconocido al actualizar el perfil');
        }
        }

        setCargando(false);
      }
      confirmarCuenta();
    },[])

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
          
          {!cargando && 
            <Alerta
              alerta={alerta}
            />
          }

          {cuentaConfirmada && 
            <Link className="block text-center my-5 text-gray-500" to="/">Iniciar Sesión</Link>}
        </div>
      </>
    )
  }