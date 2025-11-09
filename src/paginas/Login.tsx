import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { VeterinarioLogin } from "../types";
import Alerta from "../components/Alerta";
import { useAppStore } from "../stores/useAppStore";

export default function Login() {

  //Store Alerta
  const alerta = useAppStore(state => state.alerta);
  const mostrarAlerta = useAppStore(state => state.mostrarAlerta);
  const loginVeterinario = useAppStore(state => state.loginVeterinario);


  const [veterinario,setVeterinario] = useState<VeterinarioLogin>({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVeterinario({
      ...veterinario,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    if(Object.values(veterinario).includes('')){
      mostrarAlerta({
        mensaje: 'Los Campos están vacios',
        error: true
      })
      return;
    }

    //Validar email
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    if (!regex.test(veterinario.email)) {
      mostrarAlerta({
        mensaje: 'El Email no es valido',
        error: true
      })
      return;
    }

    const respuesta = await loginVeterinario(veterinario);
    
    if(respuesta){
      return navigate('/admin')
    } else {
      return setVeterinario({
        ...veterinario,
        password: ''
      })
    }

  }


  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Inicia Sesión y Administra tus 
            <span className="text-black"> Pacientes
            </span>
        </h1>
      </div>

      <div className="mt-2 md:mt-0 shadow-lg px-5 py-10 rounded-xl bg-white">
        { alerta.mensaje && (
          <Alerta
            alerta={alerta}
          />
        )

        }
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
            <input 
              type="text" 
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
              placeholder="Email de Registro"
              name="email"
              value={veterinario.email}
              onChange={handleChange}/>
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Password</label>
            <input 
              type="password" 
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
              placeholder="Tú password"
              name="password"
              value={veterinario.password}
              onChange={handleChange}/>
          </div>


          <input type="submit" className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto px-10" value="Iniciar Sesión"/>
          
        </form>
        <div className="my-5">
          <label className="text-center uppercase text-gray-600 block text-l font-bold">Prueba Inicio de Sesión</label>
          <div className="flex justify-around my-3">
            <label className="uppercase text-gray-600 block text-sm font-bold">Email: <span className="font-normal lowercase">daniel@gmail.com</span></label>
            <label className="uppercase text-gray-600 block text-sm font-bold">Password: <span className="font-normal lowercase">123456</span></label>
          </div>
        </div>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/registrar">¿No tienes una cuenta? Registrate</Link>
          <Link className="block text-center my-5 text-gray-500" to="/olvide-password">Olvide mi password</Link>
        </nav>
      </div>
    </>
  )
}
