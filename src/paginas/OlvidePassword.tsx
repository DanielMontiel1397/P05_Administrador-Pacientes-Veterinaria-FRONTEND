import { useState } from "react"
import { Link } from "react-router-dom"
import { Veterinario, MensajeAlerta } from "../types"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

export default function OlvidePassword() {

  const [email,setEmail] = useState<Veterinario['email']>('')

  const [alerta, setAlerta] =useState<MensajeAlerta>({
    msg: '',
    error: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setEmail(e.target.value)

  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(email === ''){
      setAlerta({msg: 'El Email es Obligatorio', error: true})
      return
    }

    //Consultar la API
    try{
      const {data} = await clienteAxios.post('/veterinarios/olvide-password',{email});

      setAlerta({
        msg: data.msg,
        error: false
      })
    } catch(error){
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }

  }

  const {msg} = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Recupera tú Acceso y no pierdas {""}
            <span className="text-black"> Pacientes
            </span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

          {msg &&
            <Alerta
              alerta={alerta}
            />
          }

        <form action="" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
            <input 
              type="text" 
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
              placeholder="Email de Registro"
              onChange={handleChange}/>
          </div>

          <input type="submit" className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto px-10" value="Enviar instrucciones"/>
          
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/registrar">¿No tienes una cuenta? Registrate</Link>
          <Link className="block text-center my-5 text-gray-500" to="/">¿Ya tienes cuenta? Inicia Sesión</Link>
        </nav>
      </div>
    </>
  )
}
