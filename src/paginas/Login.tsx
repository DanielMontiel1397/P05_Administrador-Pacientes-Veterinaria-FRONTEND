import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useState } from "react";
import { MensajeAlerta, VeterinarioLogin } from "../types";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import axios from 'axios'

export default function Login() {

  const {setAuth} = useAuth();
  const [alerta,setAlerta] = useState<MensajeAlerta>({
    msg: '',
    error: false
  })

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
      setAlerta({
        msg: 'Los Campos están vacios',
        error: true
      })
      return;
    }

    try{
      const {data} = await clienteAxios.post('/veterinarios/login',{
        email: veterinario.email,
        password: veterinario.password
      });

      localStorage.setItem('token',data.token)
      setVeterinario({
        email: '',
        password: ''
      })  
      setAuth(data);
      navigate('/admin');
      
    } catch(error){
        if(axios.isAxiosError(error)){
            setAlerta({
              msg: error.response?.data?.msg,
              error:true
            })
        } else {
          console.log('Error desconocido al actualizar el perfil');
        }
      

      setVeterinario({
        ...veterinario,
        password: ''
      })
    }


  }

  const {msg} = alerta;

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
        { msg && (
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
              onChange={handleChange}/>
          </div>


          <input type="submit" className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto px-10" value="Iniciar Sesión"/>
          
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/registrar">¿No tienes una cuenta? Registrate</Link>
          <Link className="block text-center my-5 text-gray-500" to="/olvide-password">Olvide mi password</Link>
        </nav>
      </div>
    </>
  )
}
